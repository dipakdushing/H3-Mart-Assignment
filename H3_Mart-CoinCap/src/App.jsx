import { Box, Button, Image, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./reudx/action";

function App() {

  const [limit, setLimit] = useState(50);
  let items = useSelector((store)=>(store.data));
  items = items.slice(0,limit);
  console.log("items",items);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
  },[limit])

  return (
    <Box>
      <Text  mt={5} textAlign="center" fontSize="3xl" fontWeight="semibold"><a href="https://coincap.io/" color="blue">coincap</a></Text>
      <Box  mt={7} display="flex" gap={6} p={5} alignItems="center" cursor="pointer">
        <TableContainer  p={5}  m="auto"  >
          <Table size="s" variant='simple' alignItems="center">
            <Thead>
              <Tr>
                <Th paddingleft={10}>Rank</Th>
                
                <Th paddingLeft={19}> Crypto_Name</Th>
                <Th >Price</Th>
                
                <Th > VWAP(24Hr)</Th>
                <Th >Change(24Hr)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                items.map((ele)=>{
                  return (
                    <Tr key={ele.id}>
                      <Td isNumeric>{ele.rank}</Td>
                      <Td>
                        <Box display="flex" gap={5} p={5} alignItems="center" cursor="pointer">
                            <Box height="40px" w="30px">
                              <Image src={`https://assets.coincap.io/assets/icons/${ele.symbol.toLowerCase()}@2x.png`} ></Image>
                            </Box>
                            <Box>
                              <Text fontSize="md">{ele.name}</Text>
                              <Text fontSize="xs" mt={4}>{ele.symbol}</Text>
                            </Box>
                        </Box>
                      </Td>
                      <Td isNumeric>${Number(ele.priceUsd).toFixed(1)}</Td>
                      
                      <Td isNumeric>${Number(ele.vwap24Hr).toFixed(2)}</Td>
                      
                      <Td isNumeric textColor={Number(ele.changePercent24Hr) < 0 ? "red" : "green" }>{Number(ele.changePercent24Hr).toFixed(3)}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box align="center" mt={3} mb={8}>
        <Button onClick={()=>setLimit(()=>limit+50)}>Load More...</Button>
      </Box> 

      
    </Box>
  )
}

export default App
