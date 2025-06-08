

import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, leftIcon, rightIcon, ...props }) => {
  const baseStyle = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 ease-in-out inline-flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500",
    secondary: "bg-slate-600 hover:bg-slate-700 text-slate-100 focus:ring-slate-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    ghost: "bg-transparent hover:bg-slate-700 text-orange-500 hover:text-orange-400 focus:ring-orange-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  titleIcon?: ReactNode;
  actions?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, title, titleIcon, actions }) => {
  return (
    <div className={`bg-slate-800 shadow-lg rounded-xl p-4 sm:p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
          <h2 className="text-lg sm:text-xl font-semibold text-orange-500 flex items-center">
            {titleIcon && <span className="mr-2 h-5 w-5">{titleIcon}</span>}
            {title}
          </h2>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      {/* The animate-modalShow class will use the keyframes defined in index.html */}
      <div className="bg-slate-800 p-5 sm:p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-orange-500">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 text-2xl leading-none">&times;</button>
        </div>
        {/* The custom-scrollbar class will use styles defined in index.html */}
        <div className="overflow-y-auto mb-4 custom-scrollbar pr-2">
          {children}
        </div>
        {footer && <div className="mt-auto pt-4 border-t border-slate-700">{footer}</div>}
      </div>
    </div>
  );
};


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => (
  <div className="mb-4">
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
    <input
      id={id}
      className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-orange-500 focus:border-orange-500 placeholder-slate-400 ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);


interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, error, className, ...props }) => (
  <div className="mb-4">
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
    <textarea
      id={id}
      rows={4}
      className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-orange-500 focus:border-orange-500 placeholder-slate-400 ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}
export const Select: React.FC<SelectProps> = ({ label, id, error, children, className, ...props }) => (
 <div className="mb-4">
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
    <select
      id={id}
      className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-orange-500 focus:border-orange-500 ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);
