import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import { useAmbientSoundscape } from './AmbientSoundscapeContext';

// Ambient Soundscape Component
const useAmbientSoundscapeEffect = () => {
  const { setSoundscapeRef } = useAmbientSoundscape();
  const soundscapeRef = useRef(null);

  useEffect(() => {
    class AmbientSoundscape {
      constructor() {
        this.initialized = false;
        this.isPlaying = false;
        this.nodes = [];

        // Master Chain
        this.masterLimiter = new Tone.Limiter(-1).toDestination();
        this.nodes.push(this.masterLimiter);

        this.mainReverb = new Tone.Reverb({
          decay: 10,
          preDelay: 0.2,
          wet: 0.6,
        }).connect(this.masterLimiter);
        this.nodes.push(this.mainReverb);

        this.stereoDelay = new Tone.PingPongDelay({
          delayTime: "16n",
          feedback: 0.4,
          wet: 0.4,
        }).connect(this.mainReverb);
        this.nodes.push(this.stereoDelay);

        this.chorus = new Tone.Chorus({
          frequency: 0.5,
          delayTime: 5.5,
          depth: 0.6,
          wet: 0.1,
        }).connect(this.stereoDelay);
        this.nodes.push(this.chorus);
        this.chorus.start();

        this.filter = new Tone.Filter({
          frequency: 2000,
          type: "lowpass",
          rolloff: -12,
          Q: 1,
        }).connect(this.chorus);
        this.nodes.push(this.filter);

        this.autoPanner = new Tone.AutoPanner({
          frequency: 0.4,
          depth: 0.2,
        }).connect(this.filter);
        this.nodes.push(this.autoPanner);
        this.autoPanner.start();

        this.mainBus = new Tone.Gain(1).connect(this.autoPanner);
        this.nodes.push(this.mainBus);

        this.droneSynth = new Tone.PolySynth(Tone.FMSynth, {
          volume: -30,
          harmonicity: 3,
          modulationIndex: 3,
          oscillator: { type: "triangle" },
          envelope: {
            attack: 4,
            decay: 2,
            sustain: 1,
            release: 4,
          },
          modulation: { type: "sine" },
          modulationEnvelope: {
            attack: 2,
            decay: 0,
            sustain: 1,
            release: 4,
          },
        }).connect(this.mainBus);
        this.nodes.push(this.droneSynth);

        this.twinkleSynth = new Tone.PolySynth(Tone.Synth, {
          volume: -20,
          oscillator: { type: "sine" },
          envelope: {
            attack: 0.02,
            decay: 0.2,
            sustain: 0,
            release: 1,
          },
        }).connect(this.stereoDelay);
        this.nodes.push(this.twinkleSynth);

        this.padSynth = new Tone.PolySynth(Tone.AMSynth, {
          volume: -20,
          oscillator: { type: "sine" },
          envelope: {
            attack: 3,
            decay: 2,
            sustain: 0.8,
            release: 4,
          },
          modulation: {
            type: "sine",
            frequency: 0.5,
          },
          harmonicity: 1.5,
          filter: {
            type: "lowpass",
            frequency: 1000,
            rolloff: -12,
          },
        }).connect(this.mainBus);
        this.nodes.push(this.padSynth);

        this.verticalFilter = new Tone.Filter({
          frequency: 2000,
          type: "lowpass",
          rolloff: -12,
          Q: 1,
        }).connect(this.chorus);
        this.nodes.push(this.verticalFilter);

        this.horizontalFilter = new Tone.Filter({
          frequency: 5000,
          type: "lowpass",
          rolloff: -12,
          Q: 1,
        }).connect(this.verticalFilter);
        this.nodes.push(this.horizontalFilter);
      }

      async initialize() {
        if (!this.initialized) {
          try {
            await Tone.start();
            this.initialized = true;
            this.isPlaying = true;
            this.startAmbientSoundscape();
          } catch (error) {
            console.warn('Failed to initialize audio context:', error);
          }
        }
      }

      handleMouseMove(event) {
        if (!this.initialized || !this.isPlaying) return;

        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const normalizedX = clientX / innerWidth;
        const normalizedY = clientY / innerHeight;

        const droneVolume = Math.max(0, 1 - normalizedY * 2);
        const twinkleVolume = Math.max(0, normalizedY * 2 - 1);
        const padVolume = Math.abs(normalizedX - 0.5) * 2;

        this.droneSynth.volume.value = droneVolume * -10;
        this.twinkleSynth.volume.value = twinkleVolume * -10;
        this.padSynth.volume.value = padVolume * -10;

        const minFilterFrequency = 200;
        const maxFilterFrequency = 8000;
        const filterFrequency =
          minFilterFrequency +
          (maxFilterFrequency - minFilterFrequency) * normalizedY;
        this.filter.frequency.value = filterFrequency;

        const minDelayFeedback = 0.2;
        const maxDelayFeedback = 0.6;
        const delayFeedback =
          minDelayFeedback +
          (maxDelayFeedback - minDelayFeedback) * normalizedY;
        this.stereoDelay.feedback.value = delayFeedback;
      }

      startAmbientSoundscape() {
        try {
          Tone.Transport.bpm.value = 25;

          const dronePattern = new Tone.Sequence(
            (time, chord) => {
              this.droneSynth.triggerAttackRelease(chord, "2n", time);
            },
            [["C4", "E4", "G4", "B4"]],
            "4n"
          );

          const twinklePattern = new Tone.Sequence(
            (time, note) => {
              this.twinkleSynth.triggerAttackRelease(note, "64n", time);
            },
            [[]],
            "1n"
          );

          const padPattern = new Tone.Sequence(
            (time, chord) => {
              this.padSynth.triggerAttackRelease(chord, "1n", time);
            },
            [["C4", "E4", "G4", "A4"]],
            "4n"
          );

          [dronePattern, twinklePattern, padPattern].forEach((pattern) =>
            pattern.start(0)
          );

          Tone.Transport.start();
        } catch (error) {
          console.warn('Failed to start ambient soundscape:', error);
        }
      }

      cleanup() {
        try {
          // Stop transport first
          if (Tone.Transport.state === "started") {
            Tone.Transport.stop();
          }

          // Dispose of all nodes in reverse order
          for (let i = this.nodes.length - 1; i >= 0; i--) {
            const node = this.nodes[i];
            if (node && typeof node.dispose === 'function') {
              try {
                node.dispose();
              } catch (error) {
                console.warn(`Failed to dispose node:`, error);
              }
            }
          }

          this.nodes = [];
          this.initialized = false;
          this.isPlaying = false;
        } catch (error) {
          console.warn('Error during cleanup:', error);
        }
      }
    }

    soundscapeRef.current = new AmbientSoundscape();
    setSoundscapeRef(soundscapeRef.current);

    const handleClick = async () => {
      if (soundscapeRef.current && !soundscapeRef.current.initialized) {
        await soundscapeRef.current.initialize();
      }
    };

    const handleMouseMove = (event) => {
      if (soundscapeRef.current) {
        soundscapeRef.current.handleMouseMove(event);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
      if (soundscapeRef.current) {
        soundscapeRef.current.cleanup();
      }
    };
  }, [setSoundscapeRef]);
};

export const AmbientSoundscape = () => {
  useAmbientSoundscapeEffect();
  return null;
};
