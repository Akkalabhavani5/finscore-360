/**
 * FinScore 360 – Visualization Helper
 */
function renderGauge(score) {
    const clamped = Math.max(0, Math.min(100, score));
    return clamped;
}
