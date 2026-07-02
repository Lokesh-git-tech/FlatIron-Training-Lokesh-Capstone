import "../styles/ai.css";

export default function SourcePanel({ sources }) {

    return (

        <div className="recommendation-card">

            <h3>Supporting Knowledge Base Sources</h3>

            {

                !sources?.length && (

                    <p>No supporting sources returned.</p>

                )

            }

            {

                sources?.map((source, index) => (

                    <div

                        key={index}

                        className="source-card"

                    >

                        <h4>

                            {source.title || source.kb_id || "Knowledge Base Article"}

                        </h4>

                        <p>

                            {source.category}

                        </p>

                        <small>

                            {source.source}

                        </small>

                    </div>

                ))

            }

        </div>

    );

}