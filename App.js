import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          item: 'A',
          subItems: ['A1', 'A2', 'A3'],
        },
        {
          item: 'B',
          subItems: ['B1', 'B2', 'B3'],
        },
        {
          item: 'C',
          subItems: ['C1', 'C2', 'C3'],
        },
        {
          item: 'D',
          subItems: ['D1', 'D2', 'D3'],
        },
      ],
    };
  }

  toggle(selected) {
    let selectedItem = this.state.data;
    let isAvailable = selectedItem.findIndex(
      isSelected => isSelected.item === selected,
    );
    let isToggle =
      selectedItem[isAvailable] &&
      selectedItem[isAvailable].isToggle !== undefined
        ? false
        : selectedItem[isAvailable].isToggle;
    selectedItem[isAvailable] = {
      ...selectedItem[isAvailable],
      isToggle: !isToggle,
    };

    this.setState({
      data: selectedItem,
    });
  }

  selectItem = (selected, subItem) => {
    let selectedItem = this.state.data;
    let isAvailable = selectedItem.findIndex(
      isSelected => isSelected.item === selected,
    );
    let isSelected =
      selectedItem[isAvailable] &&
      selectedItem[isAvailable].selected != undefined
        ? selectedItem[isAvailable].selected
        : [];
    let isAlreadySelected = isSelected.findIndex(
      isSelected => isSelected === subItem,
    );
    if (isAlreadySelected === -1) {
      isSelected.push(subItem);
    } else {
      isSelected.splice(isAlreadySelected, 1);
    }
    selectedItem[isAvailable] = {
      ...selectedItem[isAvailable],
      selected: isSelected,
    };
    this.setState({
      data: selectedItem,
    });
  };

  render() {
    const {data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {data.map((items, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.headingContainer}
                onPress={() => {
                  this.toggle(items.item);
                }}>
                <Text style={styles.heading}> {items.item} </Text>
                {items.selected &&
                  items.selected.map(selectedItem => {
                    return (
                      <View>
                        <Text>{selectedItem},</Text>
                      </View>
                    );
                  })}
              </TouchableOpacity>
              {items.isToggle && items.subItems.map(subItem => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.selectItem(items.item, subItem);
                    }}>
                    <Text>{subItem}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default App;
