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

import DateTimePicker from '@react-native-community/datetimepicker'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { ThemedText } from '@/components/ui/ThemedText';

const index = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { isOpen, setIsOpen, setText, setActions } = useActionModalStore();
  const data = useRoutineStore((state) => state.routines);
  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: '/routines/update/[id]', params: { id } })
  };
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [isSelectingItems, setIsSelectingItems] = useState(false);

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
    if (isRedirecting) {
      return;
    }    

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
      {/* <DateTimePicker
        value={new Date()}
        mode="time"
        display="spinner"
        onChange={(event, selectedDate) => {
          // handle selected time
        }}
      /> */}
    </ThemedView>
  );
};

export default index;
