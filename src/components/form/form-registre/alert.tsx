import Alert from "../../ui/alert/Alert";

export default function Alerts() {
    return (
            <div className="space-y-5 sm:space-y-6">
                <Alert
                    variant="success"
                    title="Success Message"
                    message="Be cautious when performing this action."
                    showLink={false}
                />
            </div>
    );
}
