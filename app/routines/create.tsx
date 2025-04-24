import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { ThemedView } from '@/components/ui/ThemedView'
import StyledInput from '@/components/ui/StyledInput'
import StyledButton from '@/components/ui/StyledButton'
import { useRouter } from 'expo-router'
import { useRoutineStore } from '@/stores/routineStore'

type CreateRoutineProps = {
  headerText: string;
}

const CreateRoutine: React.FC<CreateRoutineProps> = ({ headerText }) => {
  const router = useRouter();
  const addRoutine = useRoutineStore((state) => state.addRoutine);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;

    addRoutine({
      title: title.trim(),
      description: description.trim(),
      timeUntilCompleting: 0,
      expectedDuration: 0,
      timeOfCompliting: 0,
    });

    router.back();
  };

  return (
    <ThemedView className='flex-1'>
      <ScrollView className='flex-1 p-4' contentContainerStyle={{ gap: 8 }}>        
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
          numberOfLines={4}
          textAlignVertical='top'
        />

        <StyledButton
          text='Create Routine'
          onPress={handleSubmit}
          className='ml-auto mr-4 mt-2'
        />
      </ScrollView>
    </ThemedView>
  )
}

export default CreateRoutine 