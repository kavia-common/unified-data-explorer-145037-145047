'use client';

import React from 'react';

type AnyObj = Record<string, unknown>;

function isPlainObject(v: unknown) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function flatten(obj: AnyObj, prefix = ''): AnyObj {
  const out: AnyObj = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (isPlainObject(v)) {
      Object.assign(out, flatten(v as AnyObj, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function collectColumns(items: AnyObj[]): string[] {
  const cols = new Set<string>();
  items.forEach((item) => {
    const flat = flatten(item);
    Object.entries(flat).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') {
        cols.add(k);
      }
    });
  });
  return Array.from(cols).sort();
}

function renderValue(v: unknown): React.ReactNode {
  if (v === null || v === undefined) return '';
  if (Array.isArray(v)) return <span>{JSON.stringify(v)}</span>;
  if (isPlainObject(v)) return <span>{JSON.stringify(v)}</span>;
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

export default function DynamicTable({ items }: { items: AnyObj[] }) {
  const columns = React.useMemo(() => collectColumns(items), [items]);

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-gray-500">No data available for this collection.</div>
    );
  }

  return (
    <div className="card overflow-auto rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left px-4 py-3 font-semibold text-gray-700">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((raw, idx) => {
            const flat = flatten(raw);
            return (
              <tr key={idx} className="border-t">
                {columns.map((c) => (
                  <td key={c} className="px-4 py-3 text-gray-800 align-top">
                    {renderValue(flat[c])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
