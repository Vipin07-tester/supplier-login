import * as fs from 'fs';
import nodemailer from 'nodemailer';
import { EMAIL_REPORT } from './config';

export type ReportStep = {
  step: string;
  status: 'PASS' | 'FAIL';
  duration: string;
  detail?: string;
};

export class Reporter {
  steps: ReportStep[] = [];
  overallStatus: 'PASS' | 'FAIL' = 'PASS';
  startTime: number = Date.now();

  push(step: string, status: 'PASS' | 'FAIL', duration: string, detail?: string) {
    this.steps.push({ step, status, duration, detail });
    if (status === 'FAIL') this.overallStatus = 'FAIL';
    console.log('Step: ' + (status === 'PASS' ? 'PASS' : 'FAIL') + ' - ' + step + (detail ? ' | ' + detail : ''));
  }

  async sendReport(title: string, filename: string) {
  const timestamp = new Date().toLocaleString();
  const totalDuration = `${((Date.now() - this.startTime) / 1000).toFixed(2)}s`;
  const passCount = this.steps.filter(s => s.status === 'PASS').length;
  const failCount = this.steps.filter(s => s.status === 'FAIL').length;
  const overallStatus = this.overallStatus;

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #1a1a2e; color: #e0e0e0; min-height: 100vh; }
    .header { background: linear-gradient(135deg, #16213e 0%, #0f3460 100%); padding: 30px 40px; border-bottom: 2px solid #e94560; }
    .header h1 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .header p { font-size: 13px; color: #a0aec0; }
    .summary { display: flex; gap: 20px; padding: 24px 40px; background: #16213e; border-bottom: 1px solid #2d3748; flex-wrap: wrap; }
    .summary-card { background: #0f3460; border-radius: 10px; padding: 16px 24px; flex: 1; min-width: 140px; text-align: center; border: 1px solid #2d3748; }
    .summary-card .label { font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .summary-card .value { font-size: 28px; font-weight: 700; }
    .value.overall-pass { color: #68d391; }
    .value.overall-fail { color: #fc8181; }
    .value.pass { color: #68d391; }
    .value.fail { color: #fc8181; }
    .value.neutral { color: #63b3ed; }
    .content { padding: 30px 40px; }
    .section-title { font-size: 16px; font-weight: 600; color: #e2e8f0; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #2d3748; }
    .test-block { background: #16213e; border-radius: 10px; border: 1px solid #2d3748; overflow: hidden; margin-bottom: 20px; }
    .test-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #0f3460; }
    .test-header .test-name { font-size: 15px; font-weight: 600; color: #e2e8f0; }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
    .badge.PASS { background: #1a472a; color: #68d391; border: 1px solid #68d391; }
    .badge.FAIL { background: #742a2a; color: #fc8181; border: 1px solid #fc8181; }
    .steps-table { width: 100%; border-collapse: collapse; }
    .steps-table th { background: #1a202c; color: #a0aec0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding: 10px 20px; text-align: left; }
    .steps-table td { padding: 12px 20px; border-top: 1px solid #2d3748; font-size: 13px; vertical-align: top; }
    .steps-table tr:hover td { background: #1e2a3a; }
    .step-status { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 12px; }
    .step-status.PASS { color: #68d391; }
    .step-status.FAIL { color: #fc8181; }
    .step-dot { width: 8px; height: 8px; border-radius: 50%; }
    .step-dot.PASS { background: #68d391; }
    .step-dot.FAIL { background: #fc8181; }
    .detail-text { color: #718096; font-size: 12px; word-break: break-all; }
    .skipped { color: #a0aec0; font-style: italic; font-size: 12px; }
    .duration { color: #63b3ed; font-size: 12px; }
    .crash-banner { background: #742a2a; color: #fc8181; padding: 12px 20px; font-weight: 600; font-size: 14px; border-left: 4px solid #fc8181; margin: 20px 40px; border-radius: 6px; }
    .footer { text-align: center; padding: 20px; color: #4a5568; font-size: 12px; border-top: 1px solid #2d3748; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏭 ${title}</h1>
    <p>Generated: ${timestamp} &nbsp;|&nbsp; Total Duration: ${totalDuration}</p>
  </div>

  <div class="summary">
    <div class="summary-card">
      <div class="label">Overall</div>
      <div class="value overall-${overallStatus.toLowerCase()}">${overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}</div>
    </div>
    <div class="summary-card">
      <div class="label">Total Steps</div>
      <div class="value neutral">${this.steps.length}</div>
    </div>
    <div class="summary-card">
      <div class="label">Passed</div>
      <div class="value pass">${passCount}</div>
    </div>
    <div class="summary-card">
      <div class="label">Failed</div>
      <div class="value fail">${failCount}</div>
    </div>
    <div class="summary-card">
      <div class="label">Pass Rate</div>
      <div class="value neutral">${this.steps.length > 0 ? Math.round((passCount / this.steps.length) * 100) : 0}%</div>
    </div>
    <div class="summary-card">
      <div class="label">Duration</div>
      <div class="value neutral">${totalDuration}</div>
    </div>
  </div>

  ${overallStatus === 'FAIL' ? `
  <div class="crash-banner">
    ❌ ${failCount} test step(s) failed — check the table below for details
  </div>` : ''}

  <div class="content">
    <div class="section-title">Test Steps</div>
    <div class="test-block">
      <div class="test-header">
        <span class="test-name">${title}</span>
        <span class="badge ${overallStatus}">${overallStatus}</span>
      </div>
      <table class="steps-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Step</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          ${this.steps.map((s, i) => `
          <tr>
            <td style="color:#4a5568">${i + 1}</td>
            <td style="color:#e2e8f0;font-weight:500">${s.step}</td>
            <td><span class="step-status ${s.status}"><span class="step-dot ${s.status}"></span>${s.status}</span></td>
            <td><span class="duration">${s.duration}</span></td>
            <td>${s.detail
              ? `<span class="${s.detail.includes('Skipped') ? 'skipped' : 'detail-text'}">${s.detail}</span>`
              : '<span style="color:#4a5568">—</span>'
            }</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  <div class="footer">Supplier Automation Report &nbsp;|&nbsp; ${timestamp}</div>
</body>
</html>`;

  // ── Always save report locally first ──────────────────────
  fs.writeFileSync(filename, reportHtml);
  console.log('Report saved locally: ' + filename);

  // ── Then try to send email ─────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_REPORT.from, pass: EMAIL_REPORT.pass },
    });

    await transporter.sendMail({
      from:    EMAIL_REPORT.from,
      to:      EMAIL_REPORT.to,
      subject: `${title} [${overallStatus}] - ${timestamp}`,
      html:    reportHtml,
      attachments: [{ filename, path: filename }],
    });
    console.log('Email sent successfully');
  } catch (emailError) {
    console.log('Email sending failed but report is saved locally: ' + String(emailError));
  }
  }
}