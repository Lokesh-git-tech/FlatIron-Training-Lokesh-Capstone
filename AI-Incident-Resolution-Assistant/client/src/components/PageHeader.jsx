import "../styles/components.css";

export default function PageHeader({ title, subtitle }) {

    return (

        <div className="page-header">

            <h1>{title}</h1>

            <p>{subtitle}</p>

        </div>

    );

}