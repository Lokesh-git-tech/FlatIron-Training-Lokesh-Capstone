import "../styles/components.css";

export default function PageHeader({

    title,

    subtitle,

    children

}) {

    return (

        <div className="page-header">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h1>

                        {title}

                    </h1>

                    <p>

                        {subtitle}

                    </p>

                </div>

                <div>

                    {children}

                </div>

            </div>

        </div>

    );

}