# BsC Technical Company — National Network Design & Configuration

## 1. Executive Introduction
BsC Technical Company distributes high-capacity international internet bandwidth to public institutions, campuses, and enterprise tenants across Rwanda. The proposed design delivers a resilient, secure, and fully documented infrastructure that spans three geographic core sites (Mombasa, Cape Town, and London uplinks), forty regional distribution hubs, and hundreds of access networks. The document explains the architecture, IP plan, configuration baselines, security controls, and validation steps so the solution can be defended academically and implemented in tools such as Cisco Packet Tracer, GNS3, or production hardware.

### Objectives
- Deliver redundant connectivity to three upstream ISPs with dynamic failover and load-sharing.
- Provide a deterministic IP addressing and VLAN plan that scales to all 40 regions plus headquarters services.
- Secure traffic with layered defenses (firewall, DNS filtering, proxy policy, and monitoring).
- Supply ready-to-use Cisco IOS/ASA configuration snippets for core, distribution, and access layers.
- Document test procedures and a narrative suitable for a dissertation chapter.

## 2. Logical Architecture Overview

```
                           ┌──────────────────────────┐
                           │         INTERNET         │
                           └────────────┬─────────────┘
                  ┌─────────────────────┼─────────────────────┐
                  │        ISP1         │         ISP2        │
                  │      (Mombasa)      │      (Cape Town)    │
                  └──────────┬──────────┴──────────┬──────────┘
                             │                     │
                        ┌────┴────┐           ┌─────┴────┐
                        │ CoreR1  │           │  CoreR2  │
                        │ BGP/NAT │===========│  OSPF    │
                        └────┬────┘           └────┬─────┘
                             │  OSPF Area 0         │
                             │                      │
                        ┌────┴────┐            ┌────┴────┐
                        │ CoreR3  │------------│  DMZ /  │
                        │ Backup  │            │  Sec    │
                        └────┬────┘            └────┬────┘
                             │                        │
                 ┌───────────┴───────────┐     ┌──────┴────────┐
                 │ Distribution Ring A   │ ... │ Distribution N │
                 │ (40 L3 switches)      │     │ (regional POP) │
                 └───────────┬───────────┘     └──────┬────────┘
                             │ VLAN trunks           │
                             ▼                       ▼
                      ┌──────────────┐        ┌──────────────┐
                      │ Access SW    │ ...    │ Access SW    │
                      │ Users, VoIP  │        │ IoT, Wi-Fi   │
                      └──────────────┘        └──────────────┘

                           HQ DATA CENTER
   ┌──────────────────────────────────────────────────────────────┐
   │ Firewall/ASA │ Proxy (10.0.3.10) │ DNS/DHCP │ AD │ NMS │ DMZ │
   └──────────────────────────────────────────────────────────────┘
```

**How to present**: replicate the diagram in Cisco Packet Tracer or Visio, keeping ISP clouds at the top, the three core routers in a triangle, the distribution ring in the middle, and access blocks branching downward. Highlight the HQ data center services adjacent to CoreR2/CoreR3 to show centralized security.

## 3. Technology Stack & Routing Decisions

| Layer | Technology | Purpose |
| --- | --- | --- |
| Core ↔ ISP | BGP (AS 65050) | Advertise BsC aggregate (`10.0.0.0/16`), learn default routes, enforce policy per ISP. |
| Core ↔ Distribution | OSPF Area 0 | Fast convergence across the backbone with predictable metrics. |
| Distribution ↔ Access | OSPF Area 10/20/30 segments or static default | Keeps access simple while maintaining dynamic failover upstream. |
| VLAN Routing | L3 SVIs on distribution switches | Inter-VLAN routing with ACL control per region. |
| Internet Sharing | NAT overload on CoreR1/CoreR2 | Converts private ranges to public /30 uplinks. |
| Management | SNMPv3, Syslog, NetFlow, NTP | Unified visibility from the HQ NMS platform. |

## 4. IP Addressing & Subnetting Plan

### 4.1 Core and HQ Subnets

| Layer / Function | Subnet | VLAN | Gateway / Device |
| --- | --- | --- | --- |
| Network Management | `10.0.0.0/24` | 10 | `10.0.0.1` (NMS) |
| HQ Servers (DNS, DHCP, AD) | `10.0.1.0/24` | 20 | `10.0.1.10` (AD/DNS) |
| DMZ (Public Web, Mail) | `10.0.2.0/24` | 30 | `10.0.2.5` (reverse proxy) |
| Proxy / Filter | `10.0.3.0/24` | 40 | `10.0.3.10` (Squid/Pi-hole) |
| HQ Users | `10.0.4.0/22` | 100 | `10.0.4.1` (CoreR2 SVI) |
| Core Transit Links | `10.255.255.0/30` blocks | n/a | Assigned per router interconnect |
| ISP Links | `198.51.100.0/30`, `203.0.113.0/30`, `192.0.2.0/30` | n/a | Provided by respective ISPs |
| VoIP Core | `10.0.16.0/24` | 200 | `10.0.16.1` (CUCM/Call server) |
| Guest Wi-Fi | `10.0.17.0/24` | 300 | `10.0.17.1` (Firewall anchor) |

### 4.2 Distribution Subnets (40 Regional Blocks)

| Dist ID | Region (Example) | VLAN ID | Subnet (/24) | Gateway (SVI) | Host Range |
| --- | --- | --- | --- | --- | --- |
| Dist-01 | Kigali CBD | 400 | 10.0.8.0/24 | 10.0.8.1 | 10.0.8.2 – 10.0.8.254 |
| Dist-02 | Nyarugenge | 401 | 10.0.9.0/24 | 10.0.9.1 | 10.0.9.2 – 10.0.9.254 |
| Dist-03 | Gasabo | 402 | 10.0.10.0/24 | 10.0.10.1 | 10.0.10.2 – 10.0.10.254 |
| Dist-04 | Kicukiro | 403 | 10.0.11.0/24 | 10.0.11.1 | 10.0.11.2 – 10.0.11.254 |
| Dist-05 | Bugesera | 404 | 10.0.12.0/24 | 10.0.12.1 | 10.0.12.2 – 10.0.12.254 |
| Dist-06 | Rwamagana | 405 | 10.0.13.0/24 | 10.0.13.1 | 10.0.13.2 – 10.0.13.254 |
| Dist-07 | Kayonza | 406 | 10.0.14.0/24 | 10.0.14.1 | 10.0.14.2 – 10.0.14.254 |
| Dist-08 | Ngoma | 407 | 10.0.15.0/24 | 10.0.15.1 | 10.0.15.2 – 10.0.15.254 |
| Dist-09 | Kirehe | 408 | 10.0.16.0/24 | 10.0.16.1 | 10.0.16.2 – 10.0.16.254 |
| Dist-10 | Gatsibo | 409 | 10.0.17.0/24 | 10.0.17.1 | 10.0.17.2 – 10.0.17.254 |
| Dist-11 | Nyagatare | 410 | 10.0.18.0/24 | 10.0.18.1 | 10.0.18.2 – 10.0.18.254 |
| Dist-12 | Musanze | 411 | 10.0.19.0/24 | 10.0.19.1 | 10.0.19.2 – 10.0.19.254 |
| Dist-13 | Gakenke | 412 | 10.0.20.0/24 | 10.0.20.1 | 10.0.20.2 – 10.0.20.254 |
| Dist-14 | Burera | 413 | 10.0.21.0/24 | 10.0.21.1 | 10.0.21.2 – 10.0.21.254 |
| Dist-15 | Rulindo | 414 | 10.0.22.0/24 | 10.0.22.1 | 10.0.22.2 – 10.0.22.254 |
| Dist-16 | Gicumbi | 415 | 10.0.23.0/24 | 10.0.23.1 | 10.0.23.2 – 10.0.23.254 |
| Dist-17 | Ruhango | 416 | 10.0.24.0/24 | 10.0.24.1 | 10.0.24.2 – 10.0.24.254 |
| Dist-18 | Muhanga | 417 | 10.0.25.0/24 | 10.0.25.1 | 10.0.25.2 – 10.0.25.254 |
| Dist-19 | Kamonyi | 418 | 10.0.26.0/24 | 10.0.26.1 | 10.0.26.2 – 10.0.26.254 |
| Dist-20 | Nyamagabe | 419 | 10.0.27.0/24 | 10.0.27.1 | 10.0.27.2 – 10.0.27.254 |
| Dist-21 | Huye | 420 | 10.0.28.0/24 | 10.0.28.1 | 10.0.28.2 – 10.0.28.254 |
| Dist-22 | Nyanza | 421 | 10.0.29.0/24 | 10.0.29.1 | 10.0.29.2 – 10.0.29.254 |
| Dist-23 | Gisagara | 422 | 10.0.30.0/24 | 10.0.30.1 | 10.0.30.2 – 10.0.30.254 |
| Dist-24 | Nyaruguru | 423 | 10.0.31.0/24 | 10.0.31.1 | 10.0.31.2 – 10.0.31.254 |
| Dist-25 | Karongi | 424 | 10.0.32.0/24 | 10.0.32.1 | 10.0.32.2 – 10.0.32.254 |
| Dist-26 | Rutsiro | 425 | 10.0.33.0/24 | 10.0.33.1 | 10.0.33.2 – 10.0.33.254 |
| Dist-27 | Ngororero | 426 | 10.0.34.0/24 | 10.0.34.1 | 10.0.34.2 – 10.0.34.254 |
| Dist-28 | Nyabihu | 427 | 10.0.35.0/24 | 10.0.35.1 | 10.0.35.2 – 10.0.35.254 |
| Dist-29 | Rubavu | 428 | 10.0.36.0/24 | 10.0.36.1 | 10.0.36.2 – 10.0.36.254 |
| Dist-30 | Rusizi | 429 | 10.0.37.0/24 | 10.0.37.1 | 10.0.37.2 – 10.0.37.254 |
| Dist-31 | Nyamasheke | 430 | 10.0.38.0/24 | 10.0.38.1 | 10.0.38.2 – 10.0.38.254 |
| Dist-32 | Kivu Marine | 431 | 10.0.39.0/24 | 10.0.39.1 | 10.0.39.2 – 10.0.39.254 |
| Dist-33 | Lake Ports | 432 | 10.0.40.0/24 | 10.0.40.1 | 10.0.40.2 – 10.0.40.254 |
| Dist-34 | Kigali Tech Park | 433 | 10.0.41.0/24 | 10.0.41.1 | 10.0.41.2 – 10.0.41.254 |
| Dist-35 | Innovation Hub | 434 | 10.0.42.0/24 | 10.0.42.1 | 10.0.42.2 – 10.0.42.254 |
| Dist-36 | Education Cluster | 435 | 10.0.43.0/24 | 10.0.43.1 | 10.0.43.2 – 10.0.43.254 |
| Dist-37 | Health Cluster | 436 | 10.0.44.0/24 | 10.0.44.1 | 10.0.44.2 – 10.0.44.254 |
| Dist-38 | Industrial Park | 437 | 10.0.45.0/24 | 10.0.45.1 | 10.0.45.2 – 10.0.45.254 |
| Dist-39 | Agricultural IoT | 438 | 10.0.46.0/24 | 10.0.46.1 | 10.0.46.2 – 10.0.46.254 |
| Dist-40 | Tourism Cluster | 439 | 10.0.47.0/24 | 10.0.47.1 | 10.0.47.2 – 10.0.47.254 |

> *Note*: Regions are illustrative; rename to match actual field locations. Each distribution switch reserves VLAN IDs 400–439; additional access VLANs (e.g., Users = 100, VoIP = 200, Guest = 300) ride over trunks to access switches.

## 5. Device Roles & Sample Configurations

### 5.1 Core Router 1 (Mombasa Uplink)

```
hostname CoreR1
!
interface GigabitEthernet0/0
 description Uplink-to-Mombasa-ISP
 ip address 198.51.100.2 255.255.255.252
 ip nat outside
 no shutdown
!
interface GigabitEthernet0/1
 description CoreR1-to-CoreR2
 ip address 10.255.255.1 255.255.255.252
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/2
 description CoreR1-to-CoreR3
 ip address 10.255.255.5 255.255.255.252
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/3
 description CoreR1-to-Dist-Ring
 ip address 10.0.0.2 255.255.255.0
 ip nat inside
 no shutdown
!
router ospf 1
 router-id 10.0.0.1
 network 10.0.0.0 0.0.255.255 area 0
 passive-interface default
 no passive-interface GigabitEthernet0/1
 no passive-interface GigabitEthernet0/2
 no passive-interface GigabitEthernet0/3
!
router bgp 65050
 bgp log-neighbor-changes
 neighbor 198.51.100.1 remote-as 64512
 neighbor 198.51.100.1 description ISP-Mombasa
 network 10.0.0.0 mask 255.255.0.0
 maximum-paths 2
!
ip access-list standard NAT-LIST
 permit 10.0.0.0 0.0.255.255
ip nat inside source list NAT-LIST interface GigabitEthernet0/0 overload
!
ip route 0.0.0.0 0.0.0.0 198.51.100.1 track 1
track 1 ip sla 10 reachability
ip sla 10
 icmp-echo 198.51.100.1 source-interface GigabitEthernet0/0
 frequency 10
ip sla schedule 10 life forever start-time now
```

### 5.2 Core Router 2 (Cape Town Uplink + HQ Services)

```
hostname CoreR2
!
interface GigabitEthernet0/0
 description Uplink-to-Cape-Town-ISP
 ip address 203.0.113.2 255.255.255.252
 ip nat outside
 no shutdown
!
interface GigabitEthernet0/1
 description CoreR2-to-CoreR1
 ip address 10.255.255.2 255.255.255.252
 ip ospf network point-to-point
!
interface GigabitEthernet0/2
 description CoreR2-to-CoreR3
 ip address 10.255.255.9 255.255.255.252
 ip ospf network point-to-point
!
interface GigabitEthernet0/3
 description CoreR2-to-HQ-LAN
 ip address 10.0.4.1 255.255.252.0
 ip ospf priority 200
 no shutdown
!
router ospf 1
 router-id 10.0.0.2
 network 10.0.0.0 0.0.255.255 area 0
!
router bgp 65050
 neighbor 203.0.113.1 remote-as 64513
 neighbor 203.0.113.1 description ISP-CapeTown
 neighbor 10.255.255.1 remote-as 65050
 neighbor 10.255.255.1 update-source GigabitEthernet0/1
 maximum-paths 2
!
ip prefix-list AGG seq 5 permit 10.0.0.0/16
route-map OUTBOUND permit 10
 match ip address prefix-list AGG
 set local-preference 150
router bgp 65050
 neighbor 203.0.113.1 route-map OUTBOUND out
!
ip nat inside source list NAT-LIST interface GigabitEthernet0/0 overload
```

### 5.3 Core Router 3 (London Uplink / Backup)

```
hostname CoreR3
!
interface GigabitEthernet0/0
 description Uplink-to-London-ISP
 ip address 192.0.2.2 255.255.255.252
 ip nat outside
!
interface GigabitEthernet0/1
 description CoreR3-to-CoreR1
 ip address 10.255.255.6 255.255.255.252
!
interface GigabitEthernet0/2
 description CoreR3-to-CoreR2
 ip address 10.255.255.10 255.255.255.252
!
interface GigabitEthernet0/3
 description CoreR3-to-Dist-Ring-B
 ip address 10.0.5.1 255.255.255.0
!
router ospf 1
 router-id 10.0.0.3
 network 10.0.0.0 0.0.255.255 area 0
!
router bgp 65050
 neighbor 192.0.2.1 remote-as 64514
 neighbor 192.0.2.1 description ISP-London
 timers 15 45
!
bgp dampening 15 750 2000 45
!
ip route 0.0.0.0 0.0.0.0 192.0.2.1 250
```

### 5.4 Distribution Switch Template (Dist-XX)

```
hostname Dist-XX
ip routing
vtp mode transparent
!
vlan 10
 name Mgmt
vlan 100
 name Users
vlan 200
 name VoIP
vlan 300
 name Guest
vlan 40X
 name Region-XX-Core
!
interface Vlan10
 ip address 10.0.0.X 255.255.255.0
!
interface Vlan100
 ip address 10.0.X.1 255.255.255.0
 ip helper-address 10.0.1.20
 service-policy input USER-QOS
!
interface GigabitEthernet0/1
 description Uplink-to-CoreR1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 spanning-tree guard root
!
interface GigabitEthernet0/2
 description Uplink-to-CoreR3
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
router ospf 10
 passive-interface default
 no passive-interface Vlan10
 no passive-interface Vlan100
 network 10.0.X.0 0.0.0.255 area 0
 default-information originate metric 20
!
ip access-list extended REGION-FILTER
 deny tcp any any eq 23
 deny tcp any any eq 445
 permit ip any any
interface Vlan100
 ip access-group REGION-FILTER in
```

### 5.5 Access Switch Template

```
hostname Access-YY
spanning-tree mode rapid-pvst
spanning-tree portfast default
!
vlan 100 name Users
vlan 200 name VoIP
vlan 300 name Guest
!
interface range FastEthernet0/1-24
 switchport mode access
 switchport access vlan 100
 spanning-tree portfast
 storm-control broadcast level 5.00
!
interface GigabitEthernet0/1
 description Uplink-to-Dist-XX
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,100,200,300
!
ip dhcp snooping
ip dhcp snooping vlan 100,200,300
ip arp inspection vlan 100
```

### 5.6 Firewall / ASA Snippet

```
hostname BsC-FW
!
interface GigabitEthernet0/0
 nameif outside
 security-level 0
 ip address 203.0.113.6 255.255.255.252
!
interface GigabitEthernet0/1
 nameif inside
 security-level 100
 ip address 10.0.4.254 255.255.252.0
!
access-list OUTBOUND-FILTER extended permit udp host 10.0.1.10 any eq domain
access-list OUTBOUND-FILTER extended deny udp any any eq domain
access-list OUTBOUND-FILTER extended deny tcp any any eq 6881
access-list OUTBOUND-FILTER extended deny tcp any any eq 445
access-list OUTBOUND-FILTER extended permit ip any any
access-group OUTBOUND-FILTER out interface outside
!
class-map match-any WEB-TRAFFIC
 match port tcp eq 80
 match port tcp eq 443
policy-map GLOBAL-POLICY
 class WEB-TRAFFIC
  inspect http
  set connection advanced-options TCP-NORMALIZE
!
dns domain-lookup inside
dns server-group BsC-DNS
 name-server 10.0.1.10
```

### 5.7 Proxy / DNS Filtering (Pi-hole or Squid)

```
$ sudo apt update && sudo apt install squid -y
$ sudo tee /etc/squid/squid.conf <<'EOF'
http_port 3128
acl allowed_users src 10.0.0.0/16
acl blocked_domains dstdomain "/etc/squid/blacklists/ads.txt"
http_access deny blocked_domains
http_access allow allowed_users
access_log /var/log/squid/access.log
dns_nameservers 10.0.1.10
EOF

$ sudo systemctl enable --now squid
```

Populate `/etc/squid/blacklists/ads.txt` with EasyList-derived domains and append institutional blacklists for social media, torrent, or streaming platforms. Integrate Pi-hole (10.0.3.10) with the same lists to enforce DNS-level filtering.

## 6. Security & Filtering Policy

| Category | Policy | Enforcement Point | Owner |
| --- | --- | --- | --- |
| Browsing | Only approved browsers; proxy blocks suspicious User-Agents | Squid proxy + firewall HTTP inspection | IT Security |
| Ads & Malware | DNS-level ad blocking, malware sinkholes | Pi-hole + DNS ACLs | NOC Team |
| Access Control | Employees authenticate via Active Directory (802.1X optional) | Distribution switches + RADIUS | IT Admin |
| Guest Users | Captive portal on VLAN 300, internet-only | Firewall + controller | Network Ops |
| Monitoring | NMS collects SNMPv3, NetFlow, Syslog | SolarWinds/LibreNMS | NOC Team |
| Change Control | Configs stored in Git, changes peer-reviewed | Automation server | Engineering |

### Firewall Rule Highlights

| Rule | Description |
| --- | --- |
| Allow HQ/Branch internal networks to HTTP/HTTPS, DNS, and VPN ports. |
| Deny peer-to-peer (TCP/UDP 6881–6889), SMB (445), Telnet (23) outbound. |
| Enforce DNS to `10.0.1.10`; block direct DNS to internet resolvers. |
| Apply IPS signatures for critical services (Snort/FirePower). |
| Log all denied flows to Syslog (`10.0.0.50`). |

### DNS / Proxy Strategy
- Pi-hole enforces domain blocklists (EasyList, emerging threats) and custom blacklists (social media during working hours).
- Squid proxy whitelists approved browsers and adds HTTP header inspection to drop rogue traffic.
- Proxy authentication ties to Active Directory, enabling per-user audit trails.

## 7. Operations, Automation, and Monitoring
- **NMS**: LibreNMS or SolarWinds polls SNMPv3 for interface health, CPU, memory, and BGP/OSPF states.
- **NetFlow/IPFIX**: Export from core routers to 10.0.0.60 for traffic analytics.
- **Configuration backups**: Nightly `kron` job pushes running-configs to a secure SCP repository.
- **Automation**: Use Ansible or Python scripts referencing this document to push VLANs or ACL updates to all 40 distribution switches consistently.
- **Logging**: Syslog severity 5 and above forwarded to SIEM for correlation with proxy logs.

## 8. Testing & Validation Plan (Packet Tracer / Lab)
- **Ping & Path**: PC in VLAN 100 → Dist-01 → Core ring → ISP cloud; verify primary + failover path by shutting interfaces.
- **OSPF Checks**: Ensure Area 0 adjacency between cores and LSA propagation to distribution routers; validate default originate.
- **BGP Failover**: Simulate ISP outage; confirm traffic shifts to remaining ISPs via local-preference/weight.
- **DNS Resolution**: Point hosts to 10.0.1.10; attempt blocked domains to confirm Pi-hole enforcement.
- **Web Filtering**: Browse via proxy (10.0.3.10:3128). Confirm ads/blacklisted apps blocked, logs recorded.
- **Guest Isolation**: Connect test PC to VLAN 300; ensure only HTTP/HTTPS outbound, no access to VLAN 10/100.
- **Security Drills**: Run vulnerability scans to ensure ACLs drop SMB/Telnet; inspect firewall logs.

## 9. Dissertation Narrative Summary
The BsC Technical Company backbone integrates three geographically diverse international uplinks using a resilient core of Cisco routers configured with BGP for external routing and OSPF for interior convergence. Forty regional distribution switches provide deterministic Layer 3 boundaries, VLAN segmentation, and QoS for local services, while access switches simplify user and IoT connectivity. Centralized security combines firewall policies, DNS filtering, and proxy enforcement to protect subscribers from malicious domains and unsuitable content. The design emphasizes scalability, high availability, and manageability through structured IP addressing, automation hooks, and detailed monitoring. This holistic approach demonstrates how BsC can deliver nationwide connectivity that meets academic rigor and real-world operational requirements.

---

**Next Steps for Presentation**
1. Reproduce the logical diagram in Packet Tracer/Visio using the text guide.
2. Implement three core routers and at least two distribution blocks in Packet Tracer to showcase routing and failover.
3. Capture screenshots of the proxy/DNS filtering dashboard and include them in the dissertation appendices.
