/*
  Zustand und Ablauf des Finders — rein lokal (Component-State), keine
  Persistenz, keine Requests. Die Texte und die Auswertung kommen aus
  finderConfig.js; dieses Composable kennt nur Schrittindex und Antworten.
*/
import { ref, computed } from 'vue';
import { PHASES, resolveSteps, answerSummary, buildFinderCard } from './finderConfig';

const MIN_TEXT = 3;
const emptyAnswer = () => ({ optionId: null, text: '' });

export function useFinder() {
  const stepIndex = ref(0);
  const answers = ref({});

  const situationId = computed(() => answers.value.situation?.optionId || 'eigene');
  const steps = computed(() => resolveSteps(situationId.value));
  const totalSteps = computed(() => steps.value.length);
  const isFinale = computed(() => stepIndex.value >= totalSteps.value);
  const currentStep = computed(() => (isFinale.value ? null : steps.value[stepIndex.value]));
  const isLastStep = computed(() => stepIndex.value === totalSteps.value - 1);
  const currentAnswer = computed(() => (currentStep.value && answers.value[currentStep.value.id]) || emptyAnswer());
  const currentPhase = computed(() =>
    currentStep.value ? PHASES.find((p) => p.id === currentStep.value.phase) : PHASES[PHASES.length - 1]
  );

  const hasAnswer = (a) => !!(a && (a.optionId || a.text.trim().length >= MIN_TEXT));
  const canContinue = computed(() => hasAnswer(currentAnswer.value));

  const ensure = (stepId) => {
    if (!answers.value[stepId]) answers.value[stepId] = emptyAnswer();
    return answers.value[stepId];
  };

  /* Liefert true, wenn sich die Auswahl geändert hat (für das Panther-Feedback). */
  function selectOption(stepId, optionId) {
    const a = ensure(stepId);
    if (a.optionId === optionId) return false;
    a.optionId = optionId;
    // Die Situation bestimmt die Fragen-Varianten der folgenden Schritte —
    // frühere Antworten darauf wären nicht mehr zuordenbar.
    if (stepId === 'situation') {
      for (const key of Object.keys(answers.value)) if (key !== 'situation') delete answers.value[key];
    }
    return true;
  }

  function setText(stepId, text) { ensure(stepId).text = text; }
  function next() { if (canContinue.value) stepIndex.value = Math.min(stepIndex.value + 1, totalSteps.value); }
  function back() { stepIndex.value = Math.max(stepIndex.value - 1, 0); }
  function restart() { answers.value = {}; stepIndex.value = 0; }

  const protocol = computed(() =>
    steps.value
      .slice(0, Math.min(stepIndex.value, totalSteps.value))
      .map((s) => ({ id: s.id, label: s.short, value: answerSummary(s, answers.value[s.id], 'short') }))
      .filter((e) => e.value)
  );

  const phaseState = (phaseId) => {
    const idx = PHASES.findIndex((p) => p.id === phaseId);
    const cur = PHASES.findIndex((p) => p.id === currentPhase.value.id);
    if (isFinale.value || idx < cur) return 'done';
    return idx === cur ? 'active' : 'open';
  };

  const finderCard = computed(() => (isFinale.value ? buildFinderCard(steps.value, answers.value) : null));

  return {
    stepIndex, answers, steps, totalSteps, isFinale, currentStep, isLastStep,
    currentAnswer, currentPhase, canContinue, protocol, phaseState, finderCard,
    selectOption, setText, next, back, restart,
  };
}
