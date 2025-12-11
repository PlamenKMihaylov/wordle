type AlertProps = {
    children: React.ReactNode;
    isOpen: boolean;
}

export function Alert({ children, isOpen }: AlertProps) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="alert">
            {children}
        </div>
    )
}