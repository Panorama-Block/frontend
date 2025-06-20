interface EmailTemplateProps {
  title: string;
  description: string;
}

export const EmailTemplate = ({
  title,
  description,
}: EmailTemplateProps) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);