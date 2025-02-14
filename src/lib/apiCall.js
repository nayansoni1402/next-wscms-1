
export const fetchData = async (api, method = 'Post', payload, allowCache = true) => {
    // let cookies = await getCookie();  

    // let examname = cookies.find(cookie => cookie.name === 'examname')?.value || null;  
    // let userCityName = cookies.find(cookie => cookie.name === 'userCityName')?.value || null;
    // let userCountry = cookies.find(cookie => cookie.name === 'userCountry')?.value || null;
    // let userIp = cookies.find(cookie => cookie.name === 'userIp')?.value || null;
    // let token = cookies.find(cookie => cookie.name === '_token')?.value || null;
    // let device = cookies.find(cookie => cookie.name === 'device')?.value || null;

    // if(examname != 'ielts' || examname != 'pte' || examname != 'toefl' || examname != 'duolingo'){
    //   examname = await getExamName();
    // }


    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }

    // const updatedPayload = { ...payload, examname, userCityName, userCountry, userIp, device };
    const isLocal = process.env.NEXT_PUBLIC_APP_MODE != 'local';
    console.log(isLocal);
    const res = await fetch(process.env.NEXT_PUBLIC_BLOG_API_URL + api, {
        cache: allowCache && !isLocal ? "force-cache" : "no-store",
        method: method,
        headers: headers,
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
};
