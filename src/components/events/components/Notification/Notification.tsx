type NotificationProps = {
  message: string;
}
export default function Notification({ message}: NotificationProps) {
  return (
    <div class="bottom-24 left-[50%] translate-x-[-50%] fixed p-2 w-72 box-border z-50 rounded-md bg-red-600 text-white">
      <div class="relative max-h-20 min-h-12 w-full">
        <p class="m-0 p-0">{message}</p>
      </div>
    </div>
  )
}