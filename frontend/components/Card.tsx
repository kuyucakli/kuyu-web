import ReactMarkdown from 'react-markdown'

export interface ICardData {
    data: {
        layout: {
            classes: string,
            wrapperStyle: { [key: string]: string },
            mediaContainerStyle: { [key: string]: string },
            titleStyle: { [key: string]: string },
            contentStyle: { [key: string]: string },
        }
        content: {
            title: string,
            description: any
        }
    }
}

export const Card = ({ data }: ICardData): JSX.Element => {

    const { layout, content } = data
    const { title, description } = content
    const { classes, wrapperStyle, mediaContainerStyle, contentStyle, titleStyle } = layout

    return (
        <section style={{ ...wrapperStyle }} className={classes}>

            
                <h1  style={{ ...titleStyle }}>
                    {title}
                </h1>

                <div style={{ ...contentStyle }}>
                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
                </div>

           
        </section>
    )


}