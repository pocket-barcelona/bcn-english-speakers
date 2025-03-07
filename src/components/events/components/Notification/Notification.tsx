type NotificationProps = {
  message: string;
}
export default function Notification({ message}: NotificationProps) {
  return (
    <div class="top-4 left-[50%] translate-x-[-50%] fixed p-2 w-72 box-border z-50 rounded-md bg-red-600/90 text-white">
      <div class="relative max-h-20 min-h-8 w-full flex flex-col items-start justify-center">
        <p class="m-0 p-0">{message}</p>
      </div>
    </div>
  )
}