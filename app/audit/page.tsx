import React, { ReactNode } from 'react';
import Navbar from "../components/Navbar";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const sectionStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '10px',
  flex: 1,
  width: '50%', // Make each section take half the width
  boxSizing: 'border-box', // Include padding and border in the element's total width

  // Responsive styling for smaller screens
  '@media (max-width: 768px)': {
    width: '100%', // Full width on small screens
  }
};

const CodeContainer: React.FC = () => (
  <div className="bg-gray-100 p-5 rounded-lg shadow-sm my-2.5 flex-1 w-full box-border h-full">
    {/* Empty container for code */}
  </div>
);


const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="border border-gray-300 p-5 rounded-lg shadow-sm my-2.5 flex-1 w-full box-border">
    <h2>{title}</h2>
    {children}
  </section>
);


const quadrantLayoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  // Other styles if needed
};


export default function Audit() {
  return (
    <main>
      <Navbar />
      <div style={quadrantLayoutStyle}>
        <Section title="Strengths">
          <p>Details about system strengths...</p>
        </Section>
        <CodeContainer />

        <Section title="Vulnerabilities">
          <p>Details about system vulnerabilities...</p>
        </Section>
        <CodeContainer />

        <Section title="How to Fix">
          <p>Details on fixing vulnerabilities...</p>
        </Section>
        <CodeContainer />

        <Section title="Suggestions for Increased Security">
          <p>Suggestions for enhancing security...</p>
        </Section>
        <CodeContainer />
      </div>
    </main>
  );
}

