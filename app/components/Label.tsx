type LabelProps = {
    htmlFor: string;
    name: string;
};

const Label = ({htmlFor, name}: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className="block text-body-small text-textMuted">
            {name}
        </label>
    );
};

export {Label};
