export const Badge = ({ text }: { text: string }) => {
    return (
        <div className={`inline-block px-3 py-0.5 text-sm font-semibold bg-white border border-neutral-200 rounded`}>
            {text}
        </div>
    );
};
