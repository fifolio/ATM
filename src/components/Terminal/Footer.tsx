export default function Footer() {
    return (
        <div className="flex justify-between text-gray-400 border-t border-gray-700">
            {/* <div className="m-0 p-0">
                Press <span className="text-white">Ctrl+C</span> to interrupt • Type <span className="text-white">'atm help'</span> for commands
            </div> */}
            <div className="m-0 p-0">
                Type <span className="text-white">'atm help'</span> for commands
            </div>
            <div className="!text-sm">
                Automission.ai can make mistakes.
            </div>
        </div>
    )
}
