
import { Accordion, AccordionSummary } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

type Location = {
    name: string;
}

type PropsLocationList = {
    loadRegionPokemons: any
}

const PER_PAGE = 100;

const loadLocations = async (
    limit: number,
    offset: number,
    currentLocations: Location[] | [],
    setLocations: React.Dispatch<React.SetStateAction<Location[] | []>>,
    setTotalLocations: React.Dispatch<React.SetStateAction<number>>,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const response = await axios.get<any>(`/locations/?limit=${limit}&offset=${offset}`)
    setLocations([...currentLocations, ...response.data.data])
    setTotalLocations(response.data.total)
    setOffset(offset + PER_PAGE)
}

const loadLocation = async (
    selectedLocation: string,
    loadRegionPokemons: any
) => {
    const response = await axios.get<any>(`locations/${selectedLocation}`);
    loadRegionPokemons(response.data.data, response.data.data.length, selectedLocation);
}

function LocationList (props: PropsLocationList) {    
    const [locations, setLocations] = useState<Location[] | []>([]);
    const [offset, setOffset] = useState(0);
    const [totalLocations, setTotalLocations] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        loadLocations(0, 0, locations, setLocations, setTotalLocations, setOffset)
    }, [])

    useEffect(() => {    
        if(offset <= totalLocations){
            loadLocations(PER_PAGE, offset, locations, setLocations, setTotalLocations, setOffset);
        }
    }, [offset])

    useEffect(() => {
        if(selectedLocation && selectedLocation !== ''){
            loadLocation(selectedLocation, props.loadRegionPokemons)
        }        
    }, [selectedLocation])

    const handleLoadLocation = async (name: string) => {
        setSelectedLocation(name);
        setExpanded(false);
    }

    function renderRow(props: ListChildComponentProps) {
        const { index, style, data } = props;
        const name = locations[index].name;
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => handleLoadLocation(name)} style={{ backgroundColor: (selectedLocation === name ? 'green' : 'transparent') }}>
                <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        );
    }

    return (
        <Accordion expanded={expanded}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                onClick={() => setExpanded(!expanded)}
                >
                { selectedLocation && selectedLocation !== '' ? `Area: ${selectedLocation}` : 'Areas'}
            </AccordionSummary>
            <AccordionDetails>
                <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <FixedSizeList
                        height={400}
                        width={360}
                        itemSize={46}
                        itemCount={locations.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Box>
            </AccordionDetails>
        </Accordion>
    );}

export default LocationList;