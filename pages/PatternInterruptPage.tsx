import React, { useState } from 'react';
import { Card, TextArea, Button } from '../components/UI';
import { HandRaisedIcon, LightBulbIcon } from '../components/Icons'; // Assuming LightBulb for insights
import { useNavigate } from 'react-router-dom';

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const ProtocolStep: React.FC<StepProps> = ({ stepNumber, title, description, children }) => (
  <Card className="mb-6">
    <h3 className="text-xl font-semibold text-orange-500 mb-2">Step {stepNumber}: {title}</h3>
    <p className="text-slate-300 mb-4 text-sm">{description}</p>
    {children}
  </Card>
);

export const PatternInterruptPage: React.FC = () => {
  const navigate = useNavigate();
  const [step1Input, setStep1Input] = useState('');
  const [step3Q1Input, setStep3Q1Input] = useState('');
  const [step3Q2Input, setStep3Q2Input] = useState('');
  const [step3Q3Input, setStep3Q3Input] = useState('');
  const [step5Input, setStep5Input] = useState('');

  const realityCheckQuestions = [
    "Would I want my best friend to date this person or be in this situation?",
    "What would I tell my child about this dynamic?",
    "Is this how secure, healthy love/connection actually feels?"
  ];

  return (
    <div className="space-y-6 pb-8">
      <Card title="Pattern Interrupt Protocol" titleIcon={<HandRaisedIcon className="text-orange-400" />}>
        <p className="text-slate-300 mb-4">
          When you recognize a familiar unhealthy pattern activating, use this protocol to create space and choose a different response. This is an exercise in awareness and conscious choice.
        </p>
      </Card>

      <ProtocolStep
        stepNumber={1}
        title="Name It"
        description="Acknowledge the pattern you're recognizing in this moment. What specific feeling, thought, or dynamic is familiar?"
      >
        <TextArea
          placeholder="e.g., 'I feel the urge to people-please to avoid conflict, even though it makes me resentful.' or 'This interaction feels like the start of a devaluation cycle I've experienced before.'"
          value={step1Input}
          onChange={(e) => setStep1Input(e.target.value)}
          rows={3}
        />
      </ProtocolStep>

      <ProtocolStep
        stepNumber={2}
        title="Pause It"
        description="Consciously decide to pause before reacting. This creates a space between stimulus and response. Your nervous system might feel hijacked; this is about taking back control."
      >
        <p className="text-slate-300 italic">Take a few deep breaths. Remind yourself: "I need to slow this down. I don't have to react immediately."</p>
        {/* Could add a symbolic button here if desired, e.g., <Button>I am Pausing</Button> */}
      </ProtocolStep>

      <ProtocolStep
        stepNumber={3}
        title="Reality Check"
        description="Challenge the automatic thoughts and feelings. Ask yourself these clarifying questions to ground yourself in reality, not the pattern's illusion."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{realityCheckQuestions[0]}</label>
            <TextArea value={step3Q1Input} onChange={(e) => setStep3Q1Input(e.target.value)} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{realityCheckQuestions[1]}</label>
            <TextArea value={step3Q2Input} onChange={(e) => setStep3Q2Input(e.target.value)} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{realityCheckQuestions[2]}</label>
            <TextArea value={step3Q3Input} onChange={(e) => setStep3Q3Input(e.target.value)} rows={2} />
          </div>
        </div>
      </ProtocolStep>

      <ProtocolStep
        stepNumber={4}
        title="Feel the Discomfort"
        description="Choosing against your pattern often feels uncomfortable, like withdrawal. Your body might revolt with anxiety, emptiness, or a feeling of 'wrongness'. This is normal. Don't try to fix it or run from it; allow yourself to feel it. It's the sensation of your programming being challenged."
      >
         <p className="text-slate-300 italic">Acknowledge: "This discomfort is temporary. It's a sign I'm breaking free, not that I'm making a mistake."</p>
      </ProtocolStep>

      <ProtocolStep
        stepNumber={5}
        title="Choose Differently"
        description="Make the opposite choice from your usual pattern. If your pattern is to pursue harder, step back. If it's to text constantly, create space. If it's to commit immediately, slow down. What is one small, different choice you can make right now?"
      >
        <TextArea
          placeholder="e.g., 'Instead of sending a long explanation, I will state my boundary clearly and disengage.' or 'I will focus on self-soothing activities instead of seeking external validation.'"
          value={step5Input}
          onChange={(e) => setStep5Input(e.target.value)}
          rows={3}
        />
      </ProtocolStep>
      
      <Card>
        <div className="text-center">
            <LightBulbIcon className="w-8 h-8 mx-auto text-orange-400 mb-2" />
            <p className="text-slate-200 mb-4">You've walked through the Pattern Interrupt Protocol. Each time you practice this, you weaken the old neural pathways and strengthen new, healthier ones.</p>
            <Button onClick={() => navigate('/')} variant="secondary">Return to Dashboard</Button>
        </div>
      </Card>

    </div>
  );
};