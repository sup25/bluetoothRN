import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import useBLE from "./hooks/useBle";
function App() {
  const { scanForPeripherals, requestPermissions, allDevices } = useBLE();
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Check and request necessary permissions
    requestPermissions();
  }, []);

  return (
    <View>
      <Button
        title={isScanning ? "Scanning..." : "Scan for Devices"}
        onPress={() => {
          setIsScanning(true);
          scanForPeripherals(() => {
            setIsScanning(false);
          });
        }}
        disabled={isScanning}
      />
      <Text>
        {allDevices.length > 0
          ? "Bluetooth devices found."
          : "No Bluetooth devices found."}
      </Text>
      <Text>Discovered Devices:</Text>
      <FlatList
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name || "Unnamed Device"}</Text>}
      />
    </View>
  );
}

export default App;
