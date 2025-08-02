import { apiSlice } from "./ApiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "messages/send",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        getMessages: builder.query({
            query: (conversationId) => ({
                url: `messages/${conversationId}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        deleteMessage: builder.mutation({
            query: (messageId) => ({
                url: `messages/${messageId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useSendMessageMutation,
    useGetMessagesQuery,
    useDeleteMessageMutation,
} = messageApi;