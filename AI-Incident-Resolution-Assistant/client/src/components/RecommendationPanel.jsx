import "../styles/ai.css";

export default function RecommendationPanel({ recommendation }) {

    if (!recommendation) {

        return null;

    }

    return (

        <div className="recommendation-card">

            <h3>AI Recommendation</h3>

            <div className="recommendation-grid">

                <div>

                    <h4>Issue Summary</h4>

                    <p>{recommendation.issue_summary}</p>

                </div>

                <div>

                    <h4>Root Cause</h4>

                    <p>{recommendation.root_cause}</p>

                </div>

                <div>

                    <h4>Resolution Steps</h4>

                    <ol>

                        {

                            recommendation.resolution_steps?.map(

                                (step, index) => (

                                    <li key={index}>

                                        {step}

                                    </li>

                                )

                            )

                        }

                    </ol>

                </div>

                <div>

                    <h4>Escalation</h4>

                    <p>{recommendation.escalation}</p>

                </div>

                <div>

                    <h4>Confidence</h4>

                    <span className="confidence-badge">

                        {recommendation.confidence}

                    </span>

                </div>

            </div>

        </div>

    );

}