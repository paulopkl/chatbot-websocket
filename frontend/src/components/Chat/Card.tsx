interface ICardProps {
    header: string | JSX.Element;
    children: string | JSX.Element | JSX.Element[];
}

export default function Card({ header, children }: ICardProps) {
    return (
        <div className="rounded-md shadow-2xl">
            {header}
            <div className="bg-light-gray p-5">
                {children}
            </div>
        </div>
    );
}
