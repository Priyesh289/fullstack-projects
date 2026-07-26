import React from 'react';
import { Lock } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon }) {
  const RenderIcon = Icon || Lock;
  return (
    <div className="vault-empty-state">
      <RenderIcon size={48} style={{ opacity: 0.3, color: 'var(--accent-cyan)' }} />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{description}</p>
    </div>
  );
}
