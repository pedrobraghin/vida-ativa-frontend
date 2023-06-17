import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isModalVisible: boolean;
}

export default ({
  onCancel,
  onConfirm,
  children,
  confirmText,
  cancelText,
  isModalVisible,
}: ModalProps) => {
  function closeModal() {
    onCancel();
  }

  function confirm() {
    onConfirm();
  }

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent
      className="transition-all"
    >
      <View className="flex-1 justify-center items-center bg-light-black px-4">
        <View className="bg-white p-5 rounded-md">
          <View>{children}</View>
          <View className="flex-row items-center justify-end mt-4">
            <TouchableOpacity
              onPress={closeModal}
              className="px-4 py-2 rounded-md"
            >
              <Text className="text-25 text-lg font-bold">
                {cancelText || "Cancelar"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirm}
              className="bg-red-400 px-4 py-2 rounded-md ml-4"
            >
              <Text className="text-white text-lg font-bold">
                {confirmText || "Confirmar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
