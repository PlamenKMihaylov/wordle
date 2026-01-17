import { useEffect, useState } from "react";
import InfoModal from "../Modals/InfoModal";
import type { Guess } from "../../lib/evaluate";
import { type LetterState } from "../../lib/evaluate";

type HeaderProps = {
    setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
    setSolution: React.Dispatch<React.SetStateAction<string>>;
    setKeyboardState: React.Dispatch<React.SetStateAction<Record<string, LetterState>>>;
    resetGame: () => void;
}

export default function Header({ resetGame }: HeaderProps) {
    const [showInfoModal, setShowInfoModal] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && showInfoModal) {
                setShowInfoModal(false);
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [setShowInfoModal, showInfoModal]);

    return (
        <>
            <div className="header">
                <div className="header-left">
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }}>bar_chart</i>
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }} onClick={() => setShowInfoModal(true)}>help</i>
                </div>
                <div className="header-center">
                    <h1>Bulgarian Wordle 🇧🇬</h1>
                </div>
                <div className="header-right">
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }} onClick={() => resetGame()}>refresh</i>
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }}>settings</i>
                </div>
            </div>
            <hr></hr>
            {showInfoModal && (
                <div
                    className="overlay"
                    onClick={() => setShowInfoModal(false)}
                >
                    <div
                        className="info-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <InfoModal isOpen={showInfoModal} />
                    </div>
                </div>
            )}
        </>

    )
}