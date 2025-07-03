import dayjs from "dayjs"

export default function getSubscriptionStatus(date) {
    const isExpired = dayjs().isAfter(dayjs(date));
    const status = isExpired ? "Expired" : "Active";

    return { isExpired, status }
}