interface MessageLayoutProps {
    message: Messages
    user: string
}

export default function MessageLayout({ message, user}: MessageLayoutProps){
    return  (
        <div className="px-4 border py-2 rounded-md">
              {message.user == user ? (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-4 text-gray-600 text-lg font-semibold">
                    <span>
                      {message.user}
                    </span>
                    <span className="text-sm text-gray-500">
                      {message.datetime}
                    </span>
                  </div>

                  <p className="pl-2">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between gap-4 text-gray-600 text-lg font-semibold">

                    <span className="text-sm text-gray-500">
                      {message.datetime}
                    </span>
                    <span>
                      {message.user}
                    </span>
                  </div>

                  <p className="pl-2 text-right">
                    {message.text}
                  </p>
                </div>
              )}
            </div>
    )
}