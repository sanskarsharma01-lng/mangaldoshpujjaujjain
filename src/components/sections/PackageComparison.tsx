import React from 'react';
import { motion } from 'framer-motion';
import { packageComparison } from '../../data/packages';
import type { PackageFeature } from '../../types';

// ─────────────────────────────────────────────
//  Cell renderer — bool → icon, string → text
// ─────────────────────────────────────────────
const CellValue: React.FC<{ value: boolean | string; colLabel: string }> = ({
  value,
  colLabel,
}) => {
  if (typeof value === 'boolean') {
    return value ? (
      <span
        role="img"
        aria-label={`Included in ${colLabel}`}
        className="text-xl"
      >
        ✅
      </span>
    ) : (
      <span
        role="img"
        aria-label={`Not included in ${colLabel}`}
        className="text-xl opacity-60"
      >
        ❌
      </span>
    );
  }
  return (
    <span className="text-sm font-medium text-text-dark">{value}</span>
  );
};

// ─────────────────────────────────────────────
//  Column header pill labels
// ─────────────────────────────────────────────
const colHeaders = [
  { key: 'basic' as const, label: 'Basic', price: '₹1,500', style: 'text-primary' },
  { key: 'standard' as const, label: 'Standard', price: '₹3,100', style: 'text-ivory', highlighted: true },
  { key: 'premium' as const, label: 'Premium', price: '₹11,000', style: 'text-primary' },
];

// ─────────────────────────────────────────────
//  PackageComparison Section
// ─────────────────────────────────────────────
export const PackageComparison: React.FC = () => {
  return (
    <section
      id="package-comparison"
      className="pb-16 md:pb-20 lg:pb-24 bg-ivory"
      aria-labelledby="comparison-heading"
    >
      <div className="container-custom">
        {/* Sub-heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
        >
          <h3
            id="comparison-heading"
            className="text-2xl md:text-3xl font-poppins font-bold text-primary"
          >
            Detailed Package Comparison
          </h3>
          <p className="text-text-muted mt-2 text-sm md:text-base">
            See exactly what is included in each puja package
          </p>
          <div className="gold-divider mt-4" aria-hidden="true" />
        </motion.div>

        {/* Table wrapper — horizontally scrollable on mobile */}
        <motion.div
          className="overflow-x-auto custom-scrollbar rounded-2xl border border-gold/20 shadow-glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          role="region"
          aria-label="Package comparison table — scroll horizontally on mobile"
        >
          <table
            className="w-full min-w-[520px] border-collapse"
            aria-label="Puja package feature comparison"
          >
            {/* ── thead ── */}
            <thead>
              <tr>
                {/* Feature column header */}
                <th
                  scope="col"
                  className="
                    sticky top-0 left-0 z-20
                    bg-cream border-b border-gold/20
                    text-left px-5 py-4
                    text-sm font-semibold text-text-dark font-poppins
                    min-w-[180px]
                  "
                >
                  Feature
                </th>

                {/* Package column headers */}
                {colHeaders.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`
                      sticky top-0 z-10
                      border-b border-gold/20
                      px-5 py-4 text-center font-poppins
                      ${col.highlighted ? 'bg-primary-dark' : 'bg-cream'}
                    `}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className={`text-sm font-bold tracking-wide ${
                          col.highlighted ? 'text-ivory' : 'text-primary'
                        }`}
                      >
                        {col.label}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          col.highlighted ? 'text-gold' : 'text-gold'
                        }`}
                      >
                        {col.price}+
                      </span>
                      {col.highlighted && (
                        <span className="mt-1 inline-block px-2 py-0.5 bg-gold text-primary text-[10px] font-bold rounded-full tracking-wider">
                          POPULAR
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* ── tbody ── */}
            <tbody>
              {packageComparison.map((row: PackageFeature, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                return (
                  <tr
                    key={row.name}
                    className={`
                      border-b border-gold/10 last:border-b-0
                      transition-colors duration-150
                      ${isEven ? 'bg-white' : 'bg-ivory/60'}
                      hover:bg-gold/5
                    `}
                  >
                    {/* Feature name */}
                    <th
                      scope="row"
                      className={`
                        sticky left-0 z-10 px-5 py-4
                        text-left text-sm font-medium text-text-dark
                        ${isEven ? 'bg-white' : 'bg-ivory/60'}
                        group-hover:bg-gold/5
                      `}
                    >
                      {row.name}
                    </th>

                    {/* Basic column */}
                    <td className="px-5 py-4 text-center">
                      <CellValue value={row.basic} colLabel="Basic" />
                    </td>

                    {/* Standard column — highlighted bg */}
                    <td
                      className={`px-5 py-4 text-center ${
                        isEven ? 'bg-primary/5' : 'bg-primary/8'
                      }`}
                    >
                      <CellValue value={row.standard} colLabel="Standard" />
                    </td>

                    {/* Premium column */}
                    <td className="px-5 py-4 text-center">
                      <CellValue value={row.premium} colLabel="Premium" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Scroll hint for mobile */}
        <motion.p
          className="md:hidden text-center text-xs text-text-muted mt-3 flex items-center justify-center gap-1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          Scroll right to see all columns
        </motion.p>
      </div>
    </section>
  );
};

export default PackageComparison;
