import { format } from "date-fns";

export function NumberFormatter(number) {
  return String(number).padStart(2, "0"); // Formats the number to 2 digits
}

export function formatTimestamp(firebaseTimestamp) {
  if (firebaseTimestamp) {
    // Convert Firebase timestamp to milliseconds
    const date = new Date(
      firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000
    );

    // Format date to "HH:mm DD-MM-YYYY" using date-fns
    return format(date, "hh:mm aa, dd-MM-yyyy");
  }
}
