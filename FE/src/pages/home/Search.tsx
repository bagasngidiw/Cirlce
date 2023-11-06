import {
    Button,
    Center,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { RightBar, SuggestionBar, DevelopedByYourName } from "../../features/RightBar/RightBar";
import SideBar from "../../features/SideBar/SideBarLeft";
import { FormEvent, useState } from "react";
import { IFollow } from "../../interface/interface";
import { API } from "../../lib/api";
import { FollowCard } from "../../features/RightBar/FollowCard";

export function Search() {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState<IFollow[]>([])
    // const dispatch = useDispatch()

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataSearch = await API.get(`/search?q=${search}`)
        setSearchResult(dataSearch.data)
        console.log(dataSearch.data)
    }

    console.log("search result gan", searchResult);
    
    return (
        <>
            <Grid templateColumns='repeat(6, 1fr)' bg={'blackAlpha.800'}>
                <GridItem colSpan={1}>
                    <SideBar />
                </GridItem>
                <GridItem colSpan={3}>
                    <Center>
                        <form onSubmit={handleSearch}>
                            <InputGroup borderRadius={5} size="sm" width={'600px'} my={5}>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<Search2Icon color="gray.600" />}
                                />
                                <Input borderRadius={10} type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                                <InputRightAddon
                                    p={0}
                                    border="none"
                                >
                                    <Button type="submit" size="sm" borderLeftRadius={0} borderRightRadius={3.3} >
                                        Search
                                    </Button>
                                </InputRightAddon>
                            </InputGroup>
                        </form>
                    </Center>
                    {searchResult.map((user, index) => (
                        <FollowCard
                            key={index}
                            id={user.id}
                            user_id={user.user_id}
                            full_name={user.full_name}
                            username={user.username}
                            email={user.email}
                            picture={user.picture}
                            is_followed={user.is_followed}
                        />
                    ))}
                </GridItem>
                <GridItem colSpan={2}>
                    <RightBar />
                    <SuggestionBar />
                    <DevelopedByYourName />
                </GridItem>

            </Grid>
        </>
    );
};