import { apiSlice } from "./ApiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "message/sendMessage",
                method: "POST",
                body: data,
            }),
        }),

        getAllMessages: builder.query({
            query: () => ({
                url: "message",
                method: "GET",
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
                url: `message/${messageId}/delete`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useSendMessageMutation,
    useGetMessagesQuery,
    useGetAllMessagesQuery,
    useDeleteMessageMutation,
} = messageApi;