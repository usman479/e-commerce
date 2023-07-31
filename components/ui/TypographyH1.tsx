export default function TypographyH1({ children }: {
    children: React.ReactNode
}) {
    return (
        <h1 className="scroll-m-20   font-extrabold tracking-tight text-5xl">
            {children}      
        </h1>
    )
}