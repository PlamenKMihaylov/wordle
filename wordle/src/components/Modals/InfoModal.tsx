import { useEffect, useState } from "react"

type InfoModal = {
    isOpen: boolean;
}

type ExampleRow = {
    text: string;
    tiles: {
        letter: string;
        state: "correct" | "present" | "absent";
    }[];
};

const examples: ExampleRow[] = [
    {
        text: "Буквата П присъства и е на правилното място.",
        tiles: [
            { letter: "П", state: "correct" },
            { letter: "Е", state: "absent" },
            { letter: "С", state: "absent" },
            { letter: "Е", state: "absent" },
            { letter: "Н", state: "absent" },
        ],
    },
    {
        text: "Буквата У присъства, но е на грешно място.",
        tiles: [
            { letter: "Б", state: "absent" },
            { letter: "У", state: "present" },
            { letter: "Х", state: "absent" },
            { letter: "А", state: "absent" },
            { letter: "Л", state: "absent" },
        ],
    },
    {
        text: "Буквите Д, И, В, А, Н не присъстват в думата.",
        tiles: [
            { letter: "Д", state: "absent" },
            { letter: "И", state: "absent" },
            { letter: "В", state: "absent" },
            { letter: "А", state: "absent" },
            { letter: "Н", state: "absent" },
        ],
    },
];




export default function InfoModal({ isOpen }: InfoModal) {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFlip(false);
        const t = setTimeout(() => setFlip(true), 300);
        return () => clearTimeout(t);
    }, [isOpen]);

    return (
        <div>
            <p style={{ fontSize: "18px" }}>Познайте думата от 6 опита.</p>
            <p style={{ fontSize: "18px" }}>Всеки опит трябва да се състои от <b>валидна</b> 5-буквена дума.</p>
            <p style={{ fontSize: "18px" }}>След всеки опит цветовете на клетките ще се променят, за да покажат колко сте близо до правилната дума.</p>
            <hr></hr>
            <p style={{ fontSize: "18px" }}><b>Примери:</b></p>
            {examples.map((row, r) => (
                <div key={r} className="example-row">
                    <div className="example-game">
                        {row.tiles.map((t, i) => (
                            <div className="tile" key={i}>
                                <div
                                    className={`tile-inner ${flip ? "flip" : ""}`}
                                    style={{ transitionDelay: `${(r * 5 + i) * 150}ms` }}
                                >
                                    <div className="tile-front">{t.letter}</div>
                                    <div className={`tile-back ${t.state}`}>
                                        {t.letter}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="example-text" style={{ fontSize: "18px" }}>{row.text}</p>
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}