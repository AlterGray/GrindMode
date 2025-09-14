import React, { useRef, useState } from "react";
import { View } from "react-native";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import Separator from "@shared/ui/Separator";

import TimerCircle from "./TimerCircle";
import TimerControls from "./TimerControls";
import { getTimerStr } from "./utils";

type TimerProps = {
  startDuration: number;
};

const Timer: React.FC<TimerProps> = ({ startDuration }) => {
  const [timerState, setTimerStatus] = useState<
    "start" | "pause" | "run" | "finish" | "stop"
  >("start");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const actualTime = useRef(0);
  const intervalId = useRef(0);
  const [calculatedDuration, setCalculatedDuration] = useState(startDuration);

  const animatedProgressBarBg = useAnimatedSvgColor(
    "progressBarBackground",
    "stroke",
  );

  const animatedProgressBarColor = useAnimatedSvgColor(
    timerState === "pause" ? "textMuted" : "primary",
    "stroke",
  );

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      actualTime.current += 1;
      setProgress(actualTime.current / calculatedDuration);

      if (actualTime.current >= calculatedDuration) {
        setTimerStatus("finish");
        primaryButtonTitle.current = "Stop";
      }
    }, 1000);
  };

  const handleAddTenMinutes = () => {
    setCalculatedDuration((prev) => prev + 10 * 60);
  };

  const isOverflow = actualTime.current >= calculatedDuration;

  const handleReset = () => {
    setTimerStatus("start");
    actualTime.current = 0;
    setProgress(0);
    primaryButtonTitle.current = "Start";
    clearInterval(intervalId.current);
  };

  const primaryButtonTitle = useRef("Start");

  const handlePrimaryButtonPress = () => {
    let newStatus: "start" | "pause" | "run" | "finish" | "stop" = "start";

    if (timerState === "start") {
      newStatus = "run";
      primaryButtonTitle.current = "Pause";
      startTimer();
    } else if (timerState === "run") {
      newStatus = "pause";
      primaryButtonTitle.current = "Resume";
    } else if (timerState === "pause") {
      newStatus = "run";
      primaryButtonTitle.current = "Pause";
    } else if (timerState === "finish" || isOverflow) {
      handleReset();
    }

    setTimerStatus(newStatus);
  };

  const extraButtonValue = () => {
    let value = startDuration / 10;
    return Math.max(value, 1);
  };

  const extraButtonTitle = () => {
    let title = "";
    const value = extraButtonValue();

    if (startDuration < 60) {
      title = `+${value}s`;
    } else if (startDuration < 60 * 60) {
      title = `+${value}m`;
    } else {
      return `+${startDuration / 60}h`;
    }
  };

  return (
    <View className="h-[40%] gap-2 px-3 py-2">
      <View
        className="w-full h-[80%] justify-center items-center"
        onLayout={(e) => setSize(e.nativeEvent.layout)}
      >
        <TimerCircle
          progress={Math.max(0, 1 - progress)}
          progressTitle={getTimerStr(
            calculatedDuration,
            actualTime.current,
            isOverflow,
          )}
          animatedBgColor={animatedProgressBarBg}
          animatedProgressColor={animatedProgressBarColor}
          onPress={() => {}}
          parentSize={{ width: size.width * 0.9, height: size.height * 0.9 }}
          extraButtonTitle={extraButtonTitle()}
          onExtraButtonPress={handleAddTenMinutes}
        />
      </View>

      <TimerControls
        onReset={handleReset}
        primaryButtonTitle={primaryButtonTitle.current}
        onPrimaryButtonPress={handlePrimaryButtonPress}
        primaryButtonVariant={
          actualTime.current >= calculatedDuration
            ? "remove-contained-20"
            : "primary-contained-20"
        }
      />

      <Separator horizontal />
    </View>
  );
};

export default Timer;
