import { useEffect, useState } from 'react';
import { soundEngine } from '../services/soundEngine';
import { speechEngine } from '../services/speechEngine';

export function useSoundState() {
  const [state, setState] = useState(soundEngine.getState());

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setState({ ...soundEngine.getState() });
    });
  }, []);

  return state;
}

export function useSpeechState() {
  const [state, setState] = useState(speechEngine.getState());

  useEffect(() => {
    return speechEngine.subscribe(() => {
      setState({ ...speechEngine.getState() });
    });
  }, []);

  return state;
}
