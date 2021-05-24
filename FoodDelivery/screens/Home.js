import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';

const Home = () => {

    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "Hamar",
        gps: {
            latitude: 60.799160,
            longitude: 11.056100
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Pasta",
            icon: icons.noodle,
        },
        {
            id: 2,
            name: "Salat",
            icon: icons.salad,
        },
        {
            id: 3,
            name: "Burger",
            icon: icons.hamburger,
        },
        {
            id: 4,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 5,
            name: "Snacks",
            icon: icons.fries,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Burger Meny",
            rating: 4.8,
            categories: [3, 5],
            priceRating: affordable,
            photo: images.big_menu,
            duration: "30 - 45 min",
            location: {
                latitude: 60.799160,
                longitude: 11.056100,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Cheese Burger",
                    photo: images.cheeseburger,
                    description: "Cheese Burger med ost, tomat, dressing, løk",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Burger",
                    photo: images.burger,
                    description: "Burger",
                    calories: 194,
                    price: 8
                },
                {
                    menuId: 4,
                    name: "Stor burger meny",
                    photo: images.big_menu,
                    description: "Stor burger meny",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "Pizza",
            rating: 4.8,
            categories: [4, 5],
            priceRating: expensive,
            photo: images.pizza,
            duration: "15 - 20 min",
            location: {
                latitude: 60.717880,
                longitude: 11.191400,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Hawaiian Pizza",
                    photo: images.pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                }
            ]
        },

    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    function onSelectCategory(category) {
        //Filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id));

        setRestaurants(restaurantList);
        setSelectedCategory(category);
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id);

        if(category.length > 0) {
            return category[0].name
        } else {
            return ""
        }
    }

    function renderHeader() {
        return(
            <View style={{ flexDirection: 'row', height: 50}}>
                <TouchableOpacity style={{
                    width: 50,
                    paddingLeft: SIZES.padding *2,
                    justifyContent: 'center',
                }}>
                    <Image 
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <View style={{
                            width: '70%',
                            height: '100%',
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                        }}>
                            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                        </View>
                </View>

                <TouchableOpacity style={{
                    width: 50,
                    paddingRight: SIZES.padding *2,
                    justifyContent: 'center',
                }}>
                    <Image source={icons.basket} 
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    

    function renderMainCategories(){
        const renderItem = ({item}) => {
            return(
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding *2,
                        backgroundColor: (selectedCategory?.id == item.id ? COLORS.primary : COLORS.white),
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...styles.shadow,
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray,
                        }}
                    >
                        <Image 
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        />

                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                        }}
                    >
                        {item.name}
                    </Text>

                </TouchableOpacity>
            )
        }
        return(
            <View style={{ padding: SIZES.padding *2 }}>
                <Text style={{ ...FONTS.h1 }}>Hoved</Text>
                <Text style={{ ...FONTS.h1 }}>Kategorier</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding *2 }}
                 />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({item}) => (
            <TouchableOpacity
                style={{marginBottom: SIZES.padding *2}}
                // onPress -> navigate to Restaurant screen
            >
                {/* Image */}
                <View style={{
                    marginBottom: SIZES.padding,
                }}>
                    <Image 
                        source={item.photo}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: SIZES.radius,
                        }}
                    />
                

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 50,
                    width: SIZES.width * 0.3,
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...styles.shadow,
                }}>
                    <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                </View>
                </View>

                {/* Restaurant info */}
                <Text style={{ ...FONTS.body2}}>{item.name}</Text>

                <View style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                }}>

                    {/* Rating */}
                    <Image 
                        source={icons.star}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                    }}>
                        {
                            item.categories.map((categoryId) => {
                                return(
                                    <View style={{
                                        flexDirection: 'row',
                                    }}
                                    key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray}}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1,2,3].map((priceRating) => (
                                <Text 
                                key={priceRating}
                                style={{
                                    ...FONTS.body3,
                                    color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray,
                                }}>€</Text>
                            ))
                        }
                    </View>
                </View>

            </TouchableOpacity>
        )

        return(
            <FlatList 
            data={restaurants}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding *2,
                paddingBottom: 30,
            }}
            />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home;