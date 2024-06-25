import { computed } from 'vue';
import { useCountDown } from './useCountDown';

export function useSmsCode() {
  const { counts, start, isCounting } = useCountDown(60);
  const initLabel = '获取验证码';
  const countingLabel = (second: number) => `${second}s后重新获取`;
  const label = computed(() => (isCounting.value ? countingLabel(counts.value) : initLabel));

  return {
    label,
    start,
    isCounting
  };
}
