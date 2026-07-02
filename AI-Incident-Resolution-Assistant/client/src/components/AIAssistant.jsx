import { useState } from "react";
import { generateAI } from "../api/api";
import "../styles/ai.css";

const QUICK_PROMPTS = [
    {
        label: "Suggest Resolution",
        prompt: "Based on this incident, suggest the best resolution."
    },
    {
        label: "Root Cause",
        prompt: "Identify the most likely root cause."
    },
    {
        label: "Troubleshooting",
        prompt: "Provide a troubleshooting checklist."
    },
    {
        label: "Escalation",
        prompt: "Should this incident be escalated? Explain why."
    }
];

export default function AIAssistant({ incidentId }) {

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    async function handleGenerate(customQuestion = question) {

        if (!customQuestion.trim()) {

            setError("Please enter a question.");

            return;

        }

        setLoading(true);
        setError("");

        try {

            const response = await generateAI(
                incidentId,
                customQuestion
            );

            setResult(response.data);

        }

        catch (err) {

            console.error(err);

            setError("Unable to generate AI recommendation.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="ai-card">

            <h2>🤖 AI Resolution Assistant</h2>

            <p className="ai-subtitle">

                Ask AI to analyse this incident using the knowledge base.

            </p>

            <div className="prompt-buttons">

                {

                    QUICK_PROMPTS.map((item) => (

                        <button

                            key={item.label}

                            className="secondary-btn"

                            onClick={() => {

                                setQuestion(item.prompt);

                                handleGenerate(item.prompt);

                            }}

                        >

                            {item.label}

                        </button>

                    ))

                }

            </div>

            <textarea

                className="ai-question"

                rows="5"

                placeholder="Ask your own question..."

                value={question}

                onChange={(e) =>

                    setQuestion(e.target.value)

                }

            />

            {

                error &&

                <div className="error-message">

                    {error}

                </div>

            }

            <button

                className="primary-btn"

                onClick={() => handleGenerate()}

            >

                {

                    loading

                        ? "Generating..."

                        : "Generate AI Recommendation"

                }

            </button>

            {

                result && (

                    <>

                        <div className="ai-result">

                            <div className="ai-banner">

                                <strong>Model</strong>

                                <span>{result.model}</span>

                                <strong>Confidence</strong>

                                <span>

                                    {result.response.confidence}

                                </span>

                            </div>

                            <div className="result-section">

                                <h3>📋 Issue Summary</h3>

                                <p>

                                    {result.response.issue_summary}

                                </p>

                            </div>

                            <div className="result-section">

                                <h3>🔍 Root Cause</h3>

                                <p>

                                    {result.response.root_cause}

                                </p>

                            </div>

                            <div className="result-section">

                                <h3>✅ Resolution Steps</h3>

                                <ol>

                                    {

                                        result.response.resolution_steps.map(

                                            (step, index) => (

                                                <li key={index}>

                                                    {step}

                                                </li>

                                            )

                                        )

                                    }

                                </ol>

                            </div>

                            <div className="result-section">

                                <h3>🚨 Escalation</h3>

                                <p>

                                    {result.response.escalation}

                                </p>

                            </div>

                        </div>

                        <div className="sources">

                            <h2>

                                📚 Supporting Knowledge Base

                            </h2>

                            {

                                result.sources.map(

                                    (source, index) => (

                                        <div

                                            key={index}

                                            className="source-card"

                                        >

                                            <h3>

                                                {source.title}

                                            </h3>

                                            <p>

                                                <strong>KB ID:</strong>{" "}

                                                {source.kb_id}

                                            </p>

                                            <p>

                                                <strong>Category:</strong>{" "}

                                                {source.category}

                                            </p>

                                            <p>

                                                <strong>Severity:</strong>{" "}

                                                {source.severity}

                                            </p>

                                            <p>

                                                <strong>Source:</strong>{" "}

                                                {source.source}

                                            </p>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    </>

                )

            }

        </div>

    );

}