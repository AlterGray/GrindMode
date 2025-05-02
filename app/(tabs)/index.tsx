import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import CreateButton from '@/components/CreateButton';
import { usePathname, useRouter } from 'expo-router';
import { useRoutineStore } from '@/stores/routineStore';
import StyledList from '@/components/StyledList/StyledList';
import { useActionModalStore } from '@/stores/actionsModalStore';
import TouchBlocker from '@/components/TouchBlocker';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ActionType } from '../types/actionModalTypes';
import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { Routine } from '../types/routineTypes';
import { extractDuration } from '@/lib/utils/common';
import DaysPicker from '@/components/ui/DaysPicker/DaysPicker';

const index = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { isOpen, setIsOpen, setText, setActions } = useActionModalStore();
  const data = useRoutineStore((state) => state.routines);
  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);
  const updateRoutine = useRoutineStore((state) => state.updateRoutine);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: '/routines/update/[id]', params: { id } })
  };
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [isSelectingItems, setIsSelectingItems] = useState(false);
  // TODO move logic to component

  const selectItem = (id: string) => {
    let newItems = [] as string[];

    if (selectedItems.includes(id)) {
      newItems = selectedItems.filter((itemId) => itemId !== id);
    } else {
      newItems = [...selectedItems, id];
    }

    if (newItems.length === 0) {
      setIsSelectingItems(false);
      setIsOpen(false);
    }

    setSelectedItems(newItems);
    setText(newItems.length.toString());
  };

  const startSelectingItems = (id: string) => {
    if (isRedirecting)
      return; 

    let newItems = [] as string[];
    
    setIsOpen(true);
    
    if (selectedItems.includes(id)) {
      newItems = selectedItems.filter((itemId) => itemId === id);
    } else {
      newItems = [...selectedItems, id];
    }

    setIsSelectingItems(true);
    setSelectedItems(newItems);
    setText(newItems.length.toString());
  }

  const removeAction: ActionType = {
    onPress: () => setIsConfirmDialogOpened(true),
    iconName: 'trash-outline'
  };
  const completeAction: ActionType = {
    onPress: () => {
      completeRoutines(selectedItems);
      setIsOpen(false);
      setSelectedItems([]);
    },
    iconName: 'checkmark'
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedItems([]);
      setIsSelectingItems(false);
    }
    setActions([completeAction, removeAction]);
  }, [isOpen]);

  // fixed redirecting issue
  useEffect(() => {
    if (pathName === '/') { // TODO
      setIsRedirecting(false);
    }
  }, [pathName]);

  // useEffect(() => {
  //   const time = new Date();
    
  //   alert(time.getTimezoneOffset());
  // }, []);

  const itemComponent = (item: Routine) => (
    <View className='gap-2'>
      <View className='flex-row justify-between items-center gap-2'>
        <ThemedText>{item.title}</ThemedText>
        <ThemedText className='text-light-textAccent'>
          {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </ThemedText>
      </View>
      
      <View className='flex-row justify-between'>
        <DaysPicker size='small' onChange={(days) => updateRoutine({...item, days })} items={item.days} />
        <ThemedText>Duration: {extractDuration(item.expectedDuration)}</ThemedText>
      </View>
    </View>
  )

  return (
    <ThemedView className='flex-1 items-center justify-center'>
      <TouchBlocker>
        <StyledList
          selectedItems={selectedItems}
          startSelectingItems={startSelectingItems}
          isSelectingItems={isSelectingItems}
          onSelectItem={selectItem}
          onPress={redirectToUpdate}
          data={data}
          itemComponent={itemComponent}
        />
      </TouchBlocker>

      <CreateButton onPress={() => router.push('/routines/create')} />

      <ConfirmDialog
        isVisible={isConfirmDialogOpened}
        onConfirm={() => {
                removeRoutines(selectedItems);
                setIsOpen(false);
                setIsConfirmDialogOpened(false);
                setSelectedItems([]);
              }}
        onCancel={() => setIsConfirmDialogOpened(false)}
        primaryButtonColor='danger'
        primaryButtonText='Remove'
        secondaryButtonColor='secondary'
      />
    </ThemedView>
  );
};

export default index;
