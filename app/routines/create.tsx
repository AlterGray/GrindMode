import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { ThemedView } from '@/components/ui/ThemedView'
import StyledInput from '@/components/ui/StyledInput'
import StyledButton from '@/components/ui/StyledButton'
import { useRouter } from 'expo-router'
import { useRoutineStore } from '@/stores/routineStore'
import { ThemedText } from '@/components/ui/ThemedText'
import DateTimePicker from '@react-native-community/datetimepicker'
import { DurationPicker } from '@/components/DurationPicker/DurationPicker'
import DaysPicker from '@/components/ui/DaysPicker/DaysPicker'
import { DayType } from '../types/commonTypes'

type CreateRoutineProps = {
  headerText: string;
}

// TOOD make is same as edit, but when create there no values
const CreateRoutine: React.FC<CreateRoutineProps> = ({ headerText }) => {
  const router = useRouter();
  const addRoutine = useRoutineStore((state) => state.addRoutine);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [duration, setDuration] = useState(0);
  const [isTimePickerOpened, setIsTimePickerOpened] = useState(false);
  const [isDurationPickerOpened, setIsDurationPickerOpened] = useState(false);
  // TODO refactor it
  const [pickedDays, setPickedDays] = useState([
    DayType.SUNDAY,
    DayType.MONDAY,
    DayType.TUESDAY,
    DayType.WEDNESDAY,
    DayType.THURSDAY,
    DayType.FRIDAY,
    DayType.SATURDAY,
  ])

  const handleSubmit = () => {
    if (!title.trim()) return;

    addRoutine({
      title: title.trim(),
      description: description.trim(),
      startTime: startTime,
      expectedDuration: duration,
      days: pickedDays
    });

    router.back();
  };

  const formatHour = (date: Date) => {
    const hour = date.getHours();
    const hour12 = hour % 12 || 12;
    return hour12.toString();
  };

  return (
    <ThemedView className='flex-1'>
      <ScrollView className='flex-1 p-4 mx-2' contentContainerStyle={{ gap: 8 }}>        
        <StyledInput
          placeholder='Routine Title'
          value={title}
          onChangeText={setTitle}
        />

        <StyledInput
          placeholder='Description (optional)'
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={8}
        />

        <ThemedView className='flex-row items-center'>
          <ThemedText className=''>Start routine at:</ThemedText>
            <StyledButton
              text={`${formatHour(new Date(startTime))}:${new Date(startTime).getMinutes().toString().padStart(2, '0')} ${new Date(startTime).getHours() >= 12 ? 'PM' : 'AM'}`}
              variant='text'
              size='sm'
              onPress={() => setIsTimePickerOpened(true)}
            />        
        </ThemedView>
        {/* // TODO FIX IT, IT WRONG CALCULATES MINUTES WHEN ONLY HOURS EXISTS */}
        <ThemedView className='flex-row items-center'>
          <ThemedText className=''>Routine duration:</ThemedText>
          <StyledButton
              text={duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'No limit'}
              variant='text'
              size='sm'
              onPress={() => setIsDurationPickerOpened(true)}
            />       
        </ThemedView>

        {/* // TODO classname? */}
        <ThemedView className='gap-2'>
          <ThemedText className=''>Routine days:</ThemedText>
          <DaysPicker onChange={(days) => setPickedDays(days)} />
        </ThemedView>

        <StyledButton
          text='Create Routine'
          onPress={handleSubmit}
          className='ml-auto mr-4 mt-2'
        />

        {isTimePickerOpened &&
          <DateTimePicker value={new Date(startTime)} mode='time' is24Hour={false} onChange={(_, selectedDate) => {
            if (selectedDate) setStartTime(selectedDate.getTime());
            setIsTimePickerOpened(false);
          }} />
        }
        <DurationPicker isVisible={isDurationPickerOpened} onConfirm={(value) => {
          setDuration(value)
          setIsDurationPickerOpened(false)
        }} onCancel={() => setIsDurationPickerOpened(false)} />
      </ScrollView>
    </ThemedView>
  )
}

export default CreateRoutine 