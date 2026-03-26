import React, { use, useState } from 'react'
import { FORMATS, TONES } from './data';
import { generateContent } from './service/contentService';

function Home() {
    const[inputText, setInputText] = useState("");
    const[selectedTone,setSelectedTone] = useState('viral');
    const [selectedFormats, setSelectedFormats] = useState(["youtube","twitter,"])
     const[outputs, setOutputs] = useState({});
    const[loading,setLoading] = useState({});
    const[copied, setCopied] = useState(null);
    const[activeTabs, setActiveTabs] = useState(null)

  const toggleFormat = (id)=>{
    setSelectedFormats((prev)=>
    prev.includes(id)? // checking if formats exist
    prev.filter(f=> f !== id) // delete if it exists
    : [...prev, id] // add it, if it does not exist
) }

const generate = usecallback( async ()=>{
    if(!inputText.trim() || selectedFormats.length === 0) return;

    const tone = 
    TONES.find((t)=> t.id === selectedTone)?.label ?? "viral"

    const newLoading = {};
    selectedFormats.forEach((f)=>(newLoading[f]= true))

    setLoading(newLoading);
    setOutputs({});
    setActiveTabs(selectedFormats[0]);

    await Promise.all(
        selectedFormats.map(async(fid)=>{
            const format = FORMATS.find((f)=> f.id === fid)

            const system = `You are an expert content creator and copywriter. ${format.prompt(
                tone
            )}Be creative, engaging and platform-native. Output only the content itself with no preample.`
       
                try{
                    const result = await generateContent(system, inputText);

                    setOutputs((prev)=>({
                        ...prev,
                        [fid]: result
                    }));
                } 
                catch{
                    setOutputs((prev)=>({
                        ...prev,
                        [fid]:"Error generating content. Please try again",
                    }));

                }
                    finally{
                        setLoading((prev)=>({
                            ...prev,
                            [fid]:false,
                        }))
                    }
               })
    );
},[inputText, selectedFormats, selectedTone])



  return (
    <div>
      
    </div>
  )
}

export default Home
