import { DotIcon, Github } from "lucide-react";

export default function Footer() {
    return (
        <div className="flex items-center justify-between pt-1 text-gray-400 border-t border-gray-700">
            {/* <div className="m-0 p-0">
                Press <span className="text-white">Ctrl+C</span> to interrupt • Type <span className="text-white">'atm help'</span> for commands
            </div> */}
            <div className="m-0 p-0 hidden md:flex !text-sm items-center">
                Type <span className="text-white mx-2 !text-sm">'atm help'</span> for commands.
            </div>
            <div className="!text-sm flex items-center justify-center">
                &copy; {new Date().getFullYear()} ATM
                <DotIcon size={20} className="mb-1"/>
                <a className="mb-1" href="https://github.com/fifolio/ATM/" target="_blank" aria-label="Github repository link">
                    <Github size={13.5} />
                </a>
            </div>
            <div>
                <div className="!text-sm">Automission.ai can make mistakes.</div>
            </div>
        </div>
    )
}
