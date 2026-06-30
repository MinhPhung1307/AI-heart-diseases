import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Activity, Send, RotateCcw, AlertCircle, Info,
  Shield, TrendingUp, Stethoscope, Loader2, CheckCircle2,
  Ban, Apple, Calendar, Moon, ThumbsUp, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import { PREDICTION_FIELDS, RECOMMENDATIONS, getRiskLevel } from '../utils/constants';
import { validatePredictionForm } from '../utils/validators';
import { predictService } from '../services/api';

/* ───── Icon map for recommendations ───── */
const iconMap = { Activity, Heart, Apple, Calendar, Ban, Moon, ThumbsUp };

/* ───── Circular Gauge Component ───── */
const RiskGauge = ({ percent, riskLevel }) => {
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const colorMap = {
    success: { stroke: '#16A34A', bg: '#DCFCE7', text: '#15803D' },
    warning: { stroke: '#EAB308', bg: '#FEF9C3', text: '#CA8A04' },
    danger: { stroke: '#DC2626', bg: '#FEE2E2', text: '#B91C1C' },
  };
  const colors = colorMap[riskLevel.color] || colorMap.danger;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none" stroke="#E2E8F0" strokeWidth={stroke}
        />
        {/* Progress circle */}
        <motion.circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none" stroke={colors.stroke} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-extrabold"
          style={{ color: colors.text }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {percent}%
        </motion.span>
        <span className="text-xs text-text-secondary mt-1">Nguy cơ</span>
      </div>
    </div>
  );
};

/* ───── Tooltip Component ───── */
const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-text-muted hover:text-secondary transition-colors"
      >
        <Info className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  PREDICT PAGE                                      */
/* ═══════════════════════════════════════════════════ */
const PredictPage = () => {
  const initialData = {};
  PREDICTION_FIELDS.forEach((f) => {
    initialData[f.name] = f.type === 'select' ? f.options[0].value : '';
  });

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showAllRecs, setShowAllRecs] = useState(false);

  const handleChange = (name, value) => {
    const field = PREDICTION_FIELDS.find((f) => f.name === name);
    const parsed = field?.type === 'number' ? (value === '' ? '' : Number(value)) : Number(value);
    setFormData({ ...formData, [name]: parsed });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validatePredictionForm(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    try {
      const res = await predictService.predict(formData);
      const predictionData = res.data.data || res.data;
      setResult({
        prediction: predictionData.prediction,
        diseasePercent: predictionData.disease_percent,
        noDiseasePercent: predictionData.no_disease_percent,
      });
    } catch (err) {
      const message = err.response?.data?.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setResult(null);
    setErrors({});
    setApiError('');
    setShowAllRecs(false);
  };

  const riskLevel = result ? getRiskLevel(result.diseasePercent) : null;

  const getRecommendations = () => {
    if (!riskLevel) return [];
    if (riskLevel.color === 'danger') return RECOMMENDATIONS.high;
    if (riskLevel.color === 'warning') return RECOMMENDATIONS.medium;
    return RECOMMENDATIONS.low;
  };

  const recommendations = getRecommendations();
  const displayRecs = showAllRecs ? recommendations : recommendations.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Dự đoán nguy cơ bệnh tim
              </h1>
              <p className="text-text-secondary text-sm">
                Nhập thông tin sức khỏe để AI phân tích và dự đoán
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ─── LEFT PANEL: Form ─── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Thông tin sức khỏe
                </h2>
                <button type="button" onClick={handleReset} className="text-sm text-text-secondary hover:text-primary flex items-center gap-1 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  Đặt lại
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {PREDICTION_FIELDS.map((field) => (
                  <div key={field.name} className={field.name === 'age' || field.name === 'male' ? '' : ''}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <label className="text-sm font-medium text-text-primary">
                        {field.label}
                      </label>
                      {field.unit && (
                        <span className="text-xs text-text-muted">({field.unit})</span>
                      )}
                      <Tooltip text={field.tooltip} />
                    </div>

                    {field.type === 'select' ? (
                      <select
                        value={formData[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="input-field appearance-none cursor-pointer"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={formData[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        placeholder={`${field.min} - ${field.max}`}
                        className={`input-field ${errors[field.name] ? 'input-error' : ''}`}
                      />
                    )}

                    {errors[field.name] && (
                      <p className="text-primary text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {apiError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary text-sm mt-6">
                  <AlertCircle className="w-4 h-4" />{apiError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Dự đoán nguy cơ bệnh tim
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ─── RIGHT PANEL: Result ─── */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Risk Score Card */}
                  <div className="card text-center">
                    <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      Kết quả dự đoán
                    </h3>

                    <RiskGauge percent={result.diseasePercent} riskLevel={riskLevel} />

                    <div className="mt-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        riskLevel.color === 'success' ? 'bg-success-light text-success-dark'
                        : riskLevel.color === 'warning' ? 'bg-warning-light text-warning-dark'
                        : 'bg-danger-light text-danger-dark'
                      }`}>
                        {riskLevel.color === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                         riskLevel.color === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                         <AlertCircle className="w-4 h-4" />}
                        {riskLevel.label}
                      </span>
                    </div>

                    {/* Percentages */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-3 rounded-xl bg-danger-light">
                        <p className="text-xs text-text-secondary mb-1">Nguy cơ bệnh tim</p>
                        <p className="text-xl font-bold text-danger-dark">{result.diseasePercent}%</p>
                      </div>
                      <div className="p-3 rounded-xl bg-success-light">
                        <p className="text-xs text-text-secondary mb-1">Không bệnh tim</p>
                        <p className="text-xl font-bold text-success-dark">{result.noDiseasePercent}%</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation */}
                  <div className="card">
                    <h3 className="text-base font-bold text-text-primary mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-secondary" />
                      Phân tích AI
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {result.diseasePercent >= 60
                        ? `Nguy cơ cao (${result.diseasePercent}%) - Hệ thống phát hiện một số chỉ số sức khỏe đáng lo ngại. Các yếu tố như huyết áp, cholesterol và lối sống có thể ảnh hưởng đến sức khỏe tim mạch. Khuyến nghị tham khảo ý kiến bác sĩ chuyên khoa.`
                        : result.diseasePercent >= 30
                        ? `Nguy cơ trung bình (${result.diseasePercent}%) - Một số chỉ số sức khỏe cần được theo dõi. Nên duy trì lối sống lành mạnh và kiểm tra sức khỏe định kỳ.`
                        : `Nguy cơ thấp (${result.diseasePercent}%) - Các chỉ số sức khỏe trong ngưỡng an toàn. Tiếp tục duy trì lối sống lành mạnh để bảo vệ sức khỏe tim mạch.`
                      }
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="card">
                    <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      Khuyến nghị sức khỏe
                    </h3>
                    <div className="space-y-3">
                      {displayRecs.map((rec, i) => {
                        const Icon = iconMap[rec.icon] || Heart;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-3 p-3 rounded-xl bg-background hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{rec.title}</p>
                              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{rec.desc}</p>
                              {rec.sourceUrl && (
                                <a
                                  href={rec.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-secondary-dark mt-1 transition-colors hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  {rec.sourceLabel || 'Xem nguồn'}
                                </a>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {recommendations.length > 3 && (
                      <button
                        onClick={() => setShowAllRecs(!showAllRecs)}
                        className="w-full mt-3 flex items-center justify-center gap-1 text-sm text-secondary hover:text-secondary-dark font-medium transition-colors"
                      >
                        {showAllRecs ? 'Thu gọn' : `Xem thêm ${recommendations.length - 3} khuyến nghị`}
                        {showAllRecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <div className="px-4 py-3 rounded-xl bg-yellow-50 border border-yellow-200">
                    <p className="text-xs text-yellow-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Kết quả này chỉ mang tính chất tham khảo và không thay thế chẩn đoán y khoa. 
                        Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để có đánh giá chính xác.
                      </span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-primary/40" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Kết quả dự đoán
                  </h3>
                  <p className="text-sm text-text-secondary max-w-xs mx-auto">
                    Nhập đầy đủ thông tin sức khỏe và nhấn "Dự đoán" để xem kết quả phân tích từ AI
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </div>
  );
};

export default PredictPage;
