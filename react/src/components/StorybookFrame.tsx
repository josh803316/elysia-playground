import React from 'react';

const STORYBOOK_URL = import.meta.env.VITE_STORYBOOK_REACT_URL as string | undefined;

export const StorybookFrame: React.FC = () => {
  if (!STORYBOOK_URL) {
    return (
      <div style={{padding: '1.5rem'}}>
        <h1 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>React Storybook (Chromatic)</h1>
        <p style={{color: '#6b7280'}}>
          Storybook URL is not configured. Set <code>VITE_STORYBOOK_REACT_URL</code> in
          <code>react/.env</code> to the Chromatic-hosted Storybook URL.
        </p>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem'}}>
      <h1 style={{fontSize: '1.5rem', marginBottom: '0.75rem'}}>React Storybook (Chromatic)</h1>
      <div style={{flex: 1, minHeight: 0}}>
        <iframe
          src={STORYBOOK_URL}
          title='React Storybook'
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  );
};
