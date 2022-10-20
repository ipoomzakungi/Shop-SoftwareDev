import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest, setToken } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../../firebase"
import { updateProduct } from "../../redux/apiCalls";




export default function Product() {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const location = useLocation()
    const [cat, setCat] = useState([])

    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([])
    const dispatch = useDispatch();

    console.log(productId)

    const product = useSelector(state => state.product.products.products.find(product => product._id === productId))

    console.log("sadasd")
    console.log(product)

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }
    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const metadata = {
            contentType: 'image/jpeg'
        };
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("welcome")
                    const product = { ...inputs, img: downloadURL, categories: cat };
                    updateProduct(productId,product, dispatch)
                });
            }
        );
    }


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",

        ],
        []
    )
    useEffect(() => {
        const getStats = async () => {
            try {
                setToken()

                const res = await userRequest.get("/orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map(item => {
                    setPStats(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sale: item.total }
                    ])
                })
            } catch (error) {

            }
        }
        getStats();
    }, [MONTHS]);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
                        <label>Product Description</label>
                        <input name="desc" type="text" placeholder={product.desc} onChange={handleChange} />
                        <label>Product Price</label>
                        <input name="price" type="text" placeholder={product.price} onChange={handleChange} />
                        <label>Product Categories</label>
                        <input name="cat" type="text" placeholder={product.categories} onChange={handleCat} />

                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="file">
                                <Publish type="file" id="file" onChange={e => setFile(e.target.files[0])} />

                            </label>
                            
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                        <button className="productButton"  onClick={handleClick}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
